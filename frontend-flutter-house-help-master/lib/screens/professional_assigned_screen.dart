import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';
import '../models/worker.dart';
import '../models/service.dart';
import '../models/booking.dart';
import '../models/address.dart';
import '../providers/auth_provider.dart';
import '../providers/booking_provider.dart';
import '../services/api_service.dart';
import '../widgets/booking_status_timeline.dart';
import '../widgets/address_input_popup.dart';
import 'booking_confirmation_screen.dart';
import '../services/firebase_messaging_service.dart';
import '../config/app_config.dart';
import '../theme.dart';

/// Professional Assigned Screen
/// Shows professional details and payment prompt
class ProfessionalAssignedScreen extends StatefulWidget {
  final Worker worker;
  final Service? service;
  final DateTime startTime;
  final DateTime endTime;
  final double amount;

  const ProfessionalAssignedScreen({
    Key? key,
    required this.worker,
    required this.service,
    required this.startTime,
    required this.endTime,
    required this.amount,
  }) : super(key: key);

  @override
  State<ProfessionalAssignedScreen> createState() =>
      _ProfessionalAssignedScreenState();
}

class _ProfessionalAssignedScreenState
    extends State<ProfessionalAssignedScreen>
    with SingleTickerProviderStateMixin {
  late ApiService _apiService;
  late AuthProvider _authProvider;
  late Razorpay _razorpay;
  bool _isProcessing = false;
  String? _orderId;
  Map<String, dynamic>? _pendingBookingData;
  Address? _savedAddress;
  bool _isLoadingAddress = true;

  // Entrance animation — same as OperationalHero
  late AnimationController _entranceCtrl;
  late Animation<double> _entranceFade;
  late Animation<double> _entranceSlide;

  @override
  void initState() {
    super.initState();
    _apiService = ApiService();
    // PERMANENT FIX: Use static instance instead of Provider.of(context)
    // This avoids "Provider not found" errors when context doesn't have provider in scope
    _authProvider = AuthProvider.instance;
    debugPrint('ProfessionalAssignedScreen: Using AuthProvider.instance');

    // Staggered entrance — same as OperationalHero / assignment screens
    _entranceCtrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 700),
    );
    _entranceFade = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _entranceCtrl, curve: Curves.easeOut),
    );
    _entranceSlide = Tween<double>(begin: 24.0, end: 0.0).animate(
      CurvedAnimation(parent: _entranceCtrl, curve: Curves.easeOutCubic),
    );
    _entranceCtrl.forward();

    _razorpay = Razorpay();
    _razorpay.on(Razorpay.EVENT_PAYMENT_SUCCESS, _handlePaymentSuccess);
    _razorpay.on(Razorpay.EVENT_PAYMENT_ERROR, _handlePaymentError);
    _razorpay.on(Razorpay.EVENT_EXTERNAL_WALLET, _handleExternalWallet);
    _loadSavedAddress();
  }

  Future<void> _loadSavedAddress() async {
    try {
      final response = await _apiService.getDefaultAddress();
      if (response != null) {
        setState(() {
          _savedAddress = Address.fromJson(response);
          _isLoadingAddress = false;
        });
      } else {
        setState(() => _isLoadingAddress = false);
      }
    } catch (e) {
      debugPrint('Error loading saved address: $e');
      setState(() => _isLoadingAddress = false);
    }
  }

  Future<void> _showAddressPopup() async {
    final result = await showDialog<Map<String, dynamic>>(
      context: context,
      barrierDismissible: false,
      builder: (_) => AddressInputPopup(
        onAddressSaved: (address) {
          Navigator.of(context).pop(address.toCreateJson());
        },
      ),
    );

    if (result != null) {
      setState(() => _isProcessing = true);
      try {
        final savedAddress = await _apiService.saveAddress(result);
        if (savedAddress != null) {
          setState(() {
            _savedAddress = Address.fromJson(savedAddress);
          });
        }
        // Continue with payment
        _proceedToPayment();
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error saving address: ${e.toString()}'),
            backgroundColor: const Color(0xFF1D5247),
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          ),
        );
      } finally {
        setState(() => _isProcessing = false);
      }
    }
  }

  Future<void> _handlePayment() async {
    if (_isProcessing) return;

    // Check if user has a saved address
    if (_savedAddress == null) {
      // Show address popup first
      _showAddressPopup();
    } else {
      // Proceed directly to payment
      _proceedToPayment();
    }
  }

  Future<void> _proceedToPayment() async {
    if (_isProcessing) return;

    setState(() => _isProcessing = true);

    try {
      final user = _authProvider.user;
      if (user == null) {
        throw Exception('User not logged in');
      }

      // Get the service - find valid one from worker if needed
      Service? selectedService = widget.service;

      // If widget.service is null or has invalid ID (0), find a valid service from worker
      if (selectedService == null || selectedService.id == 0) {
        // Find first service with valid ID (not 0)
        final validServices = widget.worker.services
            .where((s) => s.id != 0)
            .toList();
        if (validServices.isNotEmpty) {
          selectedService = validServices.first;
        } else {
          throw Exception('No valid service available for this worker');
        }
      }

      // Debug log the service being used
      debugPrint(
        'Using service for booking: id=${selectedService.id}, name=${selectedService.name}',
      );

      // Build location data from saved address
      Map<String, dynamic>? locationData;
      if (_savedAddress != null) {
        locationData = {
          'latitude': _savedAddress!.latitude,
          'longitude': _savedAddress!.longitude,
          'address': _savedAddress!.fullAddress,
        };
      }

      // Prepare booking data (will be used after payment success)
      _pendingBookingData = {
        'userId': user.publicId,
        'workerId': widget.worker.id,
        'serviceId': selectedService.id,
        'startTime': widget.startTime.toIso8601String(),
        'endTime': widget.endTime.toIso8601String(),
        'type': 'on_demand',
        'amount': (widget.amount * 100).toInt(), // Amount in paise
        'addressId': _savedAddress?.id,
        'location': locationData,
        'deviceId': await FirebaseMessagingService.getDeviceId(),
      };

      // Create payment order on backend
      final amountInPaise = (widget.amount * 100).toInt();
      final orderResponse = await _apiService.post('payments/create-order', {
        'amount': amountInPaise,
        'currency': 'INR',
        'addressId': _savedAddress?.id,
        'location': locationData,
      });

      if (orderResponse != null && orderResponse['id'] != null) {
        _orderId = orderResponse['id'];

        // Open Razorpay payment gateway
        var options = {
          'key': AppConfig.razorpayTestKey,
          'amount': amountInPaise,
          'currency': 'INR',
          'name': 'House Help',
          'description': 'Payment for ${selectedService.name}',
          'order_id': _orderId,
          'prefill': {
            'contact':
                '9999999999', // Default contact - phone number not available in User model
            'email': user.email ?? 'test@example.com',
          },
        };

        _razorpay.open(options);
      } else {
        throw Exception('Failed to create payment order');
      }
    } catch (e) {
      debugPrint('Payment error: ${e.toString()}');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error: ${e.toString()}'),
          backgroundColor: AppTheme.warningColor,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        ),
      );
      setState(() => _isProcessing = false);
    }
  }

  @override
  void dispose() {
    _razorpay.clear();
    _entranceCtrl.dispose();
    super.dispose();
  }

  void _handlePaymentSuccess(PaymentSuccessResponse response) async {
    setState(() => _isProcessing = true);

    try {
      if (_pendingBookingData == null || _orderId == null) {
        throw Exception('Missing booking data or order ID');
      }

      // Verify payment and create booking
      final verifyResponse = await _apiService.post('payments/verify', {
        'razorpayOrderId': _orderId,
        'razorpayPaymentId': response.paymentId,
        'signature': response.signature,
        'bookingData': _pendingBookingData,
      });

      if (verifyResponse != null && verifyResponse['status'] == 'success') {
        final booking = Booking.fromJson(verifyResponse['booking']);

        // Navigate to booking confirmation
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (_) => BookingConfirmationScreen(booking: booking),
          ),
        );
      } else {
        throw Exception('Payment verification failed');
      }
    } catch (e) {
      debugPrint('Payment success error: ${e.toString()}');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error: ${e.toString()}'),
          backgroundColor: AppTheme.warningColor,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        ),
      );
    } finally {
      setState(() => _isProcessing = false);
    }
  }

  void _handlePaymentError(PaymentFailureResponse response) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Payment Failed: ${response.message}'),
        backgroundColor: AppTheme.warningColor,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
    setState(() => _isProcessing = false);
  }

  void _handleExternalWallet(ExternalWalletResponse response) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('External Wallet: ${response.walletName}'),
        backgroundColor: const Color(0xFF1D5247),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final service =
        widget.service ??
        (widget.worker.services.isNotEmpty ? widget.worker.services[0] : null);

    final workerName =
        '${widget.worker.user.firstName} ${widget.worker.user.lastName}'.trim().isNotEmpty
            ? '${widget.worker.user.firstName} ${widget.worker.user.lastName}'.trim()
            : 'Professional';

    return Scaffold(
      // Homepage warm grey background
      backgroundColor: const Color(0xFFF6F7F5),
      appBar: AppBar(
        backgroundColor: const Color(0xFFF6F7F5),
        elevation: 0,
        scrolledUnderElevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppTheme.charcoalBlack),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: AnimatedBuilder(
        animation: Listenable.merge([_entranceFade, _entranceSlide]),
        builder: (context, _) {
          return FadeTransition(
            opacity: _entranceFade,
            child: Transform.translate(
              offset: Offset(0, _entranceSlide.value),
              child: SafeArea(
                child: SingleChildScrollView(
                  // 24px horizontal padding — homepage standard
                  padding: const EdgeInsets.fromLTRB(24, 0, 24, 24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: 8),

                      // 1️⃣ Header — charcoalBlack title, secondaryText subtitle
                      _buildHeader(workerName),

                      const SizedBox(height: 8),

                      // 2️⃣ Status chip — ProactiveMessage pattern
                      _buildStatusChip(),

                      const SizedBox(height: 16),

                      // 3️⃣ Hero card — dark emerald gradient
                      _buildHeroCard(workerName),

                      const SizedBox(height: 10),

                      // 4️⃣ Worker profile card — TrustLayer gradient
                      _buildWorkerCard(workerName),

                      const SizedBox(height: 10),

                      // 6️⃣ Service details — TrustLayer gradient card
                      _buildServiceDetails(service),

                      const SizedBox(height: 10),

                      // 7️⃣ Payment prompt — TrustLayer gradient card
                      _buildPaymentPrompt(),

                      const SizedBox(height: 20),

                      // 8️⃣ CTA — 52px, emeraldGreen, radius 16
                      _buildPaymentCTA(),

                      const SizedBox(height: 20),

                      // 9️⃣ Trust banner — homepage muted strip
                      _buildTrustBanner(),

                      const SizedBox(height: 20),
                    ],
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  // ── Header ────────────────────────────────────────────────────────────────
  Widget _buildHeader(String workerName) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Professional Assigned!',
          style: TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.w700,
            color: AppTheme.charcoalBlack,
            letterSpacing: -0.5,
            height: 1.2,
          ),
        ),
        const SizedBox(height: 6),
        Text(
          '$workerName has been assigned to your ${widget.service?.name ?? 'service'} and will arrive at your scheduled time.',
          style: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w400,
            color: AppTheme.secondaryText,
            height: 1.5,
          ),
        ),
      ],
    );
  }

  // ── Status chip — ProactiveMessage pattern ─────────────────────────────────
  Widget _buildStatusChip() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: const Color(0xFFF5FAF8),
        borderRadius: BorderRadius.circular(20),
        boxShadow: AppTheme.cardShadow,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 20,
            height: 20,
            decoration: BoxDecoration(
              color: AppTheme.emeraldGreen.withOpacity(0.1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Icon(Icons.check_circle_outline_rounded,
                color: AppTheme.emeraldGreen, size: 13),
          ),
          const SizedBox(width: 8),
          const Text(
            'Assignment complete',
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w600,
              color: AppTheme.charcoalBlack,
              letterSpacing: 0.1,
            ),
          ),
        ],
      ),
    );
  }

  // ── Hero card — dark emerald gradient ─────────────────────────────────────
  Widget _buildHeroCard(String workerName) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [
            Color(0xFF193F37),
            Color(0xFF1F6B5F),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        boxShadow: AppTheme.heroShadow,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Icon(Icons.check_rounded, color: Colors.white, size: 22),
              ),
              const SizedBox(width: 12),
              const Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Professional Found',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                        letterSpacing: -0.2,
                      ),
                    ),
                    SizedBox(height: 2),
                    Text(
                      'Background-checked & system-matched.',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w400,
                        color: Color(0xB3FFFFFF),
                        letterSpacing: 0.1,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Container(height: 1, color: Color(0x1FFFFFFF)),
          const SizedBox(height: 16),
          Row(
            children: [
              _buildHeroStatPill(Icons.verified_outlined, 'Verified'),
              const SizedBox(width: 16),
              _buildHeroStatPill(Icons.schedule_outlined, 'On-time'),
              const SizedBox(width: 16),
              _buildHeroStatPill(Icons.thumb_up_outlined, 'Guaranteed'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildHeroStatPill(IconData icon, String label) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, color: Colors.white.withOpacity(0.8), size: 14),
        const SizedBox(width: 4),
        Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w500,
            color: Colors.white.withOpacity(0.8),
            letterSpacing: 0.2,
          ),
        ),
      ],
    );
  }

  // ── Worker profile card — TrustLayer gradient ─────────────────────────────
  Widget _buildWorkerCard(String workerName) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFFF5FAF8), Color(0xFFF0F7F4)],
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.stoneGray, width: 1.0),
        boxShadow: AppTheme.cardShadow,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              // Avatar — emeraldGreen circle
              Container(
                width: 56,
                height: 56,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppTheme.emeraldGreen,
                  boxShadow: AppTheme.cardShadow,
                ),
                child: Center(
                  child: Text(
                    widget.worker.user.firstName.isNotEmpty
                        ? widget.worker.user.firstName[0].toUpperCase()
                        : 'W',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Flexible(
                          child: Text(
                            workerName,
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w700,
                              color: AppTheme.charcoalBlack,
                              letterSpacing: -0.2,
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        // Verified badge — muted chip style
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: AppTheme.emeraldGreen,
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: const Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(Icons.verified_outlined, color: Colors.white, size: 11),
                              SizedBox(width: 3),
                              Text(
                                'Verified',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 10,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Row(
                      children: [
                        const Icon(Icons.star_rounded, color: Color(0xFFFFB300), size: 16),
                        const SizedBox(width: 4),
                        Text(
                          widget.worker.rating.toStringAsFixed(1),
                          style: const TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w600,
                            color: AppTheme.charcoalBlack,
                          ),
                        ),
                        const SizedBox(width: 4),
                        Text(
                          '(${widget.worker.reviewCount} reviews)',
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w400,
                            color: AppTheme.secondaryText,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          if (widget.worker.bio.isNotEmpty) ...[
            const SizedBox(height: 14),
            Divider(color: AppTheme.stoneGray, height: 1, thickness: 1),
            const SizedBox(height: 14),
            Row(
              children: const [
                Icon(Icons.info_outline_rounded, color: AppTheme.emeraldGreen, size: 15),
                SizedBox(width: 6),
                Text(
                  'About',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w700,
                    color: AppTheme.charcoalBlack,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 6),
            Text(
              widget.worker.bio,
              style: const TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w400,
                color: AppTheme.secondaryText,
                height: 1.5,
              ),
            ),
          ],
        ],
      ),
    );
  }

  // ── Service details — TrustLayer gradient card ────────────────────────────
  Widget _buildServiceDetails(Service? service) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFFF5FAF8), Color(0xFFF0F7F4)],
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.stoneGray, width: 1.0),
        boxShadow: AppTheme.cardShadow,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Service Details',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w700,
              color: AppTheme.charcoalBlack,
              letterSpacing: -0.1,
            ),
          ),
          const SizedBox(height: 14),
          _buildDetailRow(
            icon: Icons.calendar_today_outlined,
            title: DateFormat('EEEE, MMMM d, yyyy').format(widget.startTime),
            subtitle: '${DateFormat('jm').format(widget.startTime)} – ${DateFormat('jm').format(widget.endTime)}',
          ),
          _buildDetailDivider(),
          _buildDetailRow(
            icon: Icons.home_repair_service_outlined,
            title: service?.name ?? 'Service',
          ),
          _buildDetailDivider(),
          _buildDetailRow(
            icon: Icons.currency_rupee_rounded,
            title: '₹${widget.amount.toStringAsFixed(0)}',
            isBold: true,
          ),
        ],
      ),
    );
  }

  Widget _buildDetailDivider() => Padding(
    padding: const EdgeInsets.symmetric(vertical: 10),
    child: Divider(color: AppTheme.stoneGray, height: 1, thickness: 1),
  );

  Widget _buildDetailRow({
    required IconData icon,
    required String title,
    String? subtitle,
    bool isBold = false,
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 32,
          height: 32,
          decoration: BoxDecoration(
            color: AppTheme.emeraldGreen.withOpacity(0.1),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(icon, color: AppTheme.emeraldGreen, size: 16),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: isBold ? FontWeight.w700 : FontWeight.w600,
                  color: AppTheme.charcoalBlack,
                ),
              ),
              if (subtitle != null) ...[
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w400,
                    color: AppTheme.secondaryText,
                  ),
                ),
              ],
            ],
          ),
        ),
      ],
    );
  }

  // ── Payment prompt — TrustLayer gradient card ────────────────────────────
  Widget _buildPaymentPrompt() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFFF5FAF8), Color(0xFFF0F7F4)],
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.stoneGray, width: 1.0),
        boxShadow: AppTheme.cardShadow,
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              color: AppTheme.emeraldGreen.withOpacity(0.1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Icon(Icons.credit_card_outlined,
                color: AppTheme.emeraldGreen, size: 16),
          ),
          const SizedBox(width: 12),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Confirm to proceed',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                    color: AppTheme.charcoalBlack,
                    letterSpacing: -0.1,
                  ),
                ),
                SizedBox(height: 4),
                Text(
                  'Payment confirms your booking. We\'ll take care of everything else.',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w400,
                    color: AppTheme.secondaryText,
                    height: 1.5,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ── Payment CTA — 52px, emeraldGreen, radius 16 ───────────────────────────
  Widget _buildPaymentCTA() {
    return SizedBox(
      width: double.infinity,
      height: 52,
      child: ElevatedButton(
        onPressed: _isProcessing ? null : _handlePayment,
        style: ElevatedButton.styleFrom(
          backgroundColor: AppTheme.emeraldGreen,
          disabledBackgroundColor: AppTheme.stoneGray,
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          elevation: 0,
        ),
        child: _isProcessing
            ? const SizedBox(
                height: 20,
                width: 20,
                child: CircularProgressIndicator(
                  strokeWidth: 2.5,
                  color: Colors.white,
                ),
              )
            : const Text(
                'Confirm & pay',
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w600,
                  color: Colors.white,
                ),
              ),
      ),
    );
  }

  // ── Trust banner — homepage muted strip ───────────────────────────────────
  Widget _buildTrustBanner() {
    return Opacity(
      opacity: 0.72,
      child: Column(
        children: [
          Container(height: 1, color: AppTheme.stoneGray),
          const SizedBox(height: 20),
          const Text(
            'Your home is in expert hands',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w500,
              color: AppTheme.secondaryText,
              letterSpacing: 0.2,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _buildMutedStatPill('6 Lakh+', 'Families'),
              const SizedBox(width: 8),
              _buildMutedDot(),
              const SizedBox(width: 8),
              _buildMutedStatPill('4.8 ★', 'Rated'),
              const SizedBox(width: 8),
              _buildMutedDot(),
              const SizedBox(width: 8),
              _buildMutedStatPill('50k+', 'Reviews'),
            ],
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            alignment: WrapAlignment.center,
            children: [
              _buildMutedChip('Verified helpers'),
              _buildMutedChip('On-time arrival'),
              _buildMutedChip('Satisfaction guaranteed'),
            ],
          ),
          const SizedBox(height: 20),
          Container(height: 1, color: AppTheme.stoneGray),
        ],
      ),
    );
  }

  Widget _buildMutedStatPill(String value, String label) {
    return Column(
      children: [
        Text(value, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: Color(0xFF5F6361), height: 1.1)),
        const SizedBox(height: 2),
        Text(label, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w400, color: AppTheme.secondaryText, letterSpacing: 0.3)),
      ],
    );
  }

  Widget _buildMutedDot() {
    return Container(
      width: 3,
      height: 3,
      decoration: const BoxDecoration(color: AppTheme.stoneGray, shape: BoxShape.circle),
    );
  }

  Widget _buildMutedChip(String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: const Color(0xFFF0F1EF),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        '✓  $label',
        style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w400, color: Color(0xFF5F6361), height: 1.3),
      ),
    );
  }
}
