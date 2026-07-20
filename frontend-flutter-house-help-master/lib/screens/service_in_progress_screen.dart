/// WARNING: DO NOT MODIFY THIS FILE WITHOUT ARCHITECTURAL APPROVAL
///
/// This screen implements the Service In Progress state, which is critical
/// for building and maintaining user trust in SEVAQ's managed service model.
///
/// Trust Principles:
/// - Status-only display (no user control)
/// - Support access provided
/// - Outcome ownership reassured
/// - No worker-user communication
/// - SEVAQ as intermediary
///
/// Changes to this screen must comply with these principles and require
/// architectural review.
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import 'dart:async';
import '../models/worker.dart';
import '../models/service.dart';
import '../models/booking.dart';
import '../providers/auth_provider.dart';
import '../services/api_service.dart';
import '../widgets/booking_status_timeline.dart';
import '../theme.dart';
import 'service_completed_screen.dart';

enum ServiceStatus { onTheWay, started, completed }

class ServiceInProgressScreen extends StatefulWidget {
  final String bookingId;
  final Worker worker;
  final Service? service;
  final DateTime startTime;
  final DateTime endTime;
  final double amount;

  const ServiceInProgressScreen({
    Key? key,
    required this.bookingId,
    required this.worker,
    required this.service,
    required this.startTime,
    required this.endTime,
    required this.amount,
  }) : super(key: key);

  @override
  State<ServiceInProgressScreen> createState() =>
      _ServiceInProgressScreenState();
}

class _ServiceInProgressScreenState extends State<ServiceInProgressScreen>
    with SingleTickerProviderStateMixin {
  late ApiService _apiService;
  late AuthProvider _authProvider;
  late Timer _pollingTimer;
  Timer? _countdownTimer;
  Duration? _timeLeft;

  ServiceStatus _status = ServiceStatus.onTheWay;
  DateTime? _arrivalTime;
  bool _hasError = false;
  
  String? _otp;
  bool _isOtpVerified = false;

  static const int POLLING_INTERVAL = 60; // 60 seconds

  // Entrance animation — same as OperationalHero
  late AnimationController _entranceCtrl;
  late Animation<double> _entranceFade;
  late Animation<double> _entranceSlide;

  @override
  void initState() {
    super.initState();
    _apiService = ApiService();
    // PERMANENT FIX: Use static instance instead of Provider.of(context)
    _authProvider = AuthProvider.instance;
    debugPrint('ServiceInProgressScreen: Using AuthProvider.instance');

    // Calculate estimated arrival time (mock for now)
    _arrivalTime = DateTime.now().add(const Duration(minutes: 30));

    // Staggered entrance — same as homepage OperationalHero
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

    // Start polling for status updates
    _startPolling();
  }

  void _startPolling() {
    _pollingTimer = Timer.periodic(const Duration(seconds: POLLING_INTERVAL), (
      timer,
    ) {
      _checkServiceStatus();
    });
  }

  Future<void> _checkServiceStatus() async {
    try {
      final response = await _apiService.get(
        'bookings/${widget.bookingId}',
      );

      if (response != null) {
        final status = response['status'];
        final statusStr = status.toString().toLowerCase();

        setState(() {
          if (response['otp'] != null) {
            _otp = response['otp'].toString();
          }
          if (response['isOtpVerified'] != null) {
            _isOtpVerified = response['isOtpVerified'] == true;
          }
          if (response['startedAt'] != null) {
            _startedAt = DateTime.parse(response['startedAt']);
          }
        });

        switch (statusStr) {
          case 'confirmed':
          case 'assigned':
          case 'en_route':
          case 'on_the_way':
            setState(() {
              _status = ServiceStatus.onTheWay;
              if (response['arrivalTime'] != null) {
                _arrivalTime = DateTime.parse(response['arrivalTime']);
              }
            });
            break;
          case 'in_progress':
          case 'started':
            if (_status != ServiceStatus.started) {
              setState(() {
                _status = ServiceStatus.started;
              });
              _startCountdown();
            }
            break;
          case 'completed':
            _handleServiceCompleted();
            break;
          default:
            debugPrint('Unknown service status: $status');
        }
      }
    } on TokenExpiredException {
      debugPrint('ServiceInProgressScreen: Token expired');
      _pollingTimer.cancel();
      if (mounted) {
        await _authProvider.handleTokenExpired();
      }
    } catch (e) {
      debugPrint('Error checking service status: $e');
      setState(() {
        _hasError = true;
      });
    }
  }

  DateTime? _startedAt;

  void _startCountdown() {
    _countdownTimer?.cancel();
    _updateTimeLeft();
    _countdownTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!mounted) return;
      _updateTimeLeft();
    });
  }

  void _updateTimeLeft() {
    setState(() {
      if (_startedAt != null) {
        final endTime = _startedAt!.add(const Duration(minutes: 60));
        final diff = endTime.difference(DateTime.now());
        if (diff.isNegative) {
          _timeLeft = Duration.zero;
        } else {
          _timeLeft = diff;
        }
      } else {
        _timeLeft = const Duration(minutes: 60);
      }
    });
  }

  void _handleServiceCompleted() {
    _pollingTimer.cancel();

    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (_) => ServiceCompletedScreen(
              worker: widget.worker,
              service: widget.service,
              startTime: widget.startTime,
              endTime: widget.endTime,
              amount: widget.amount,
            ),
          ),
        );
      }
    });
  }

  // Support option helpers
  void _openChatSupport() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Chat support would open here'),
        backgroundColor: const Color(0xFF1D5247),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  void _openCallSupport() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Call support would open here'),
        backgroundColor: const Color(0xFF1D5247),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  @override
  void dispose() {
    _pollingTimer?.cancel();
    _countdownTimer?.cancel();
    _entranceCtrl.dispose();
    super.dispose();
  }

  // ── Status helpers ─────────────────────────────────────────────────────────
  String _getStatusTitle() {
    switch (_status) {
      case ServiceStatus.onTheWay:
        return 'Professional is on the way';
      case ServiceStatus.started:
        return 'Service in progress';
      case ServiceStatus.completed:
        return 'Service completed';
    }
  }

  String _getStatusSubtitle() {
    switch (_status) {
      case ServiceStatus.onTheWay:
        return 'Your service provider is en route to your location';
      case ServiceStatus.started:
        return 'Your service is being performed';
      case ServiceStatus.completed:
        return 'Your service has been completed';
    }
  }

  BookingAssignmentState get _timelineState {
    switch (_status) {
      case ServiceStatus.onTheWay:
        return BookingAssignmentState.assigned;
      case ServiceStatus.started:
        return BookingAssignmentState.inProgress;
      case ServiceStatus.completed:
        return BookingAssignmentState.completed;
    }
  }

  String _formatTime(DateTime time) {
    final hour = time.hour;
    final minute = time.minute;
    final period = hour >= 12 ? 'PM' : 'AM';
    final displayHour = hour % 12 == 0 ? 12 : hour % 12;
    final displayMinute = minute.toString().padLeft(2, '0');
    return '$displayHour:$displayMinute $period';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // Homepage warm grey background
      backgroundColor: const Color(0xFFF6F7F5),
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
                  padding: const EdgeInsets.fromLTRB(24, 20, 24, 24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // 1️⃣ Header
                      _buildHeader(),
                      const SizedBox(height: 8),

                      // 2️⃣ Status chip — ProactiveMessage pattern
                      _buildStatusChip(),
                      const SizedBox(height: 16),

                      // 3️⃣ Hero card — dark emerald gradient
                      _buildHeroCard(),
                      if (!_isOtpVerified && _otp != null) _buildOtpCard(),
                      // Booking Status Timeline — architectural approval granted
                      BookingStatusTimeline(
                        currentState: _timelineState,
                      ),
                      const SizedBox(height: 10),

                      // 4️⃣ Service summary — TrustLayer card
                      _buildServiceSummary(),
                      const SizedBox(height: 10),

                      // 5️⃣ Worker info — TrustLayer card
                      _buildWorkerCard(),
                      const SizedBox(height: 10),

                      // 6️⃣ Reassurance — opacity 0.72
                      Opacity(
                        opacity: 0.72,
                        child: Text(
                          'We\'re monitoring your service and will handle any issues that arise.',
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w400,
                            color: AppTheme.secondaryText,
                            height: 1.5,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      const SizedBox(height: 10),

                      // 7️⃣ Support row — TrustLayer card
                      _buildSupportRow(),
                      const SizedBox(height: 10),

                      // 8️⃣ Error chip (only if error)
                      if (_hasError) _buildErrorChip(),

                      const SizedBox(height: 16),

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

  // ── Header ─────────────────────────────────────────────────────────────────
  Widget _buildHeader() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          _getStatusTitle(),
          style: const TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.w700,
            color: AppTheme.charcoalBlack,
            letterSpacing: -0.5,
            height: 1.2,
          ),
        ),
        const SizedBox(height: 6),
        Text(
          _getStatusSubtitle(),
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
    final IconData icon;
    final String label;
    final Color chipColor;

    switch (_status) {
      case ServiceStatus.onTheWay:
        icon = Icons.directions_car_outlined;
        label = 'En route to your location';
        chipColor = const Color(0xFF1565C0); // Blue
        break;
      case ServiceStatus.started:
        icon = Icons.handyman_outlined;
        label = 'Service in progress';
        chipColor = AppTheme.emeraldGreen;
        break;
      case ServiceStatus.completed:
        icon = Icons.check_circle_outline_rounded;
        label = 'Service complete';
        chipColor = AppTheme.emeraldGreen;
        break;
    }

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
              color: chipColor.withOpacity(0.1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, color: chipColor, size: 13),
          ),
          const SizedBox(width: 8),
          Text(
            label,
            style: const TextStyle(
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

  // ── Hero card — dark emerald gradient (OperationalHero pattern) ───────────
  Widget _buildHeroCard() {
    final bool isOnTheWay = _status == ServiceStatus.onTheWay;
    final bool isStarted = _status == ServiceStatus.started;

    String timeRemainingStr = '';
    if (isStarted && _timeLeft != null) {
      if (_timeLeft == Duration.zero) {
        timeRemainingStr = 'Wrapping up...';
      } else {
        String twoDigits(int n) => n.toString().padLeft(2, '0');
        final hours = twoDigits(_timeLeft!.inHours);
        final minutes = twoDigits(_timeLeft!.inMinutes.remainder(60));
        final seconds = twoDigits(_timeLeft!.inSeconds.remainder(60));
        timeRemainingStr = '$hours:$minutes:$seconds remaining';
      }
    }

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF193F37), Color(0xFF1F6B5F)],
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
                child: Icon(
                  isOnTheWay
                      ? Icons.directions_car_outlined
                      : isStarted
                          ? Icons.home_repair_service_outlined
                          : Icons.check_rounded,
                  color: Colors.white,
                  size: 20,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      isOnTheWay
                          ? 'Professional En Route'
                          : isStarted
                              ? 'Service Underway'
                              : 'Service Complete',
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                        letterSpacing: -0.2,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      isOnTheWay && _arrivalTime != null
                          ? 'Estimated arrival: ${_formatTime(_arrivalTime!)}'
                          : isStarted
                              ? (timeRemainingStr.isNotEmpty 
                                  ? timeRemainingStr
                                  : 'Your home is being taken care of.')
                              : 'All done. Thank you for choosing SEVAQ.',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w400,
                        color: Colors.white.withOpacity(0.72),
                        letterSpacing: 0.1,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Container(height: 1, color: Colors.white.withOpacity(0.12)),
          const SizedBox(height: 16),
          // Stat pills — same as OperationalHero
          Row(
            children: [
              _buildHeroStatPill(Icons.verified_outlined, 'Verified'),
              const SizedBox(width: 16),
              _buildHeroStatPill(Icons.shield_outlined, 'Monitored'),
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

  // ── Service summary — TrustLayer gradient (76px) ──────────────────────────
  Widget _buildServiceSummary() {
    final startStr = DateFormat('hh:mm a').format(widget.startTime);
    final endStr = DateFormat('hh:mm a').format(widget.endTime);

    return Container(
      height: 76,
      padding: const EdgeInsets.fromLTRB(14, 6, 14, 6),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFFF5FAF8), Color(0xFFF0F7F4)],
        ),
        borderRadius: BorderRadius.circular(16),
        boxShadow: AppTheme.cardShadow,
      ),
      child: Row(
        children: [
          Container(
            width: 22,
            height: 22,
            decoration: BoxDecoration(
              color: AppTheme.emeraldGreen.withOpacity(0.12),
              borderRadius: BorderRadius.circular(11),
            ),
            child: const Icon(
              Icons.home_repair_service_outlined,
              color: AppTheme.emeraldGreen,
              size: 14,
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  widget.service?.name ?? 'Home Service',
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.charcoalBlack,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${DateFormat('EEE, d MMM').format(widget.startTime)} · $startStr–$endStr  ·  ₹${widget.amount.toStringAsFixed(0)}/visit',
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                    color: Color(0xFF6B6B6B),
                    letterSpacing: 0.1,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ── Worker info — TrustLayer gradient (60px) ──────────────────────────────
  Widget _buildOtpCard() {
    if (_otp == null || _isOtpVerified || _status == ServiceStatus.started || _status == ServiceStatus.completed) {
      return const SizedBox.shrink();
    }
    
    return Container(
      margin: const EdgeInsets.only(bottom: 24),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppTheme.softGreen.withOpacity(0.5),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppTheme.emeraldGreen.withOpacity(0.3)),
      ),
      child: Column(
        children: [
          const Icon(Icons.lock_outline, color: AppTheme.emeraldGreen, size: 28),
          const SizedBox(height: 12),
          const Text(
            'Share this PIN with your professional to start the service',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w500,
              color: AppTheme.charcoalBlack,
            ),
          ),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.05),
                  blurRadius: 4,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: Text(
              _otp!,
              style: const TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.w800,
                letterSpacing: 4.0,
                color: AppTheme.emeraldGreen,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildWorkerCard() {
    final workerName =
        '${widget.worker.user.firstName} ${widget.worker.user.lastName}'.trim();

    return Container(
      height: 68,
      padding: const EdgeInsets.fromLTRB(14, 6, 14, 6),
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
        children: [
          // Avatar circle
          Container(
            width: 40,
            height: 40,
            decoration: const BoxDecoration(
              shape: BoxShape.circle,
              color: AppTheme.emeraldGreen,
            ),
            child: Center(
              child: Text(
                widget.worker.user.firstName.isNotEmpty
                    ? widget.worker.user.firstName[0].toUpperCase()
                    : 'W',
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  workerName.isNotEmpty ? workerName : 'Professional',
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.charcoalBlack,
                  ),
                ),
                const SizedBox(height: 2),
                Row(
                  children: [
                    const Icon(Icons.verified_outlined,
                        color: AppTheme.emeraldGreen, size: 12),
                    const SizedBox(width: 4),
                    const Text(
                      'Verified Professional',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
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
    );
  }

  // ── Support row — TrustLayer card (60px) ──────────────────────────────────
  Widget _buildSupportRow() {
    return InkWell(
      onTap: _showSupportOptions,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        height: 60,
        padding: const EdgeInsets.fromLTRB(14, 6, 10, 6),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFFF5FAF8), Color(0xFFF0F7F4)],
          ),
          borderRadius: BorderRadius.circular(16),
          boxShadow: AppTheme.cardShadow,
        ),
        child: Row(
          children: [
            Container(
              width: 22,
              height: 22,
              decoration: BoxDecoration(
                color: AppTheme.emeraldGreen.withOpacity(0.12),
                borderRadius: BorderRadius.circular(11),
              ),
              child: const Icon(
                Icons.help_outline_rounded,
                color: AppTheme.emeraldGreen,
                size: 14,
              ),
            ),
            const SizedBox(width: 10),
            const Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Need help?',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: AppTheme.charcoalBlack,
                    ),
                  ),
                  SizedBox(height: 2),
                  Text(
                    'Chat or call our support team',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                      color: Color(0xFF6B6B6B),
                      letterSpacing: 0.1,
                    ),
                  ),
                ],
              ),
            ),
            const Icon(
              Icons.chevron_right_rounded,
              color: AppTheme.secondaryText,
              size: 18,
            ),
          ],
        ),
      ),
    );
  }

  // ── Error chip ─────────────────────────────────────────────────────────────
  Widget _buildErrorChip() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        color: const Color(0xFFFFF8F1),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.warningColor.withOpacity(0.4), width: 1.0),
      ),
      child: Row(
        children: [
          Icon(Icons.error_outline_rounded, color: AppTheme.warningColor, size: 16),
          const SizedBox(width: 10),
          const Expanded(
            child: Text(
              'We\'re having trouble updating your service status. Please try again later.',
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w400,
                color: AppTheme.secondaryText,
                height: 1.4,
              ),
            ),
          ),
        ],
      ),
    );
  }

  // ── Trust banner — homepage muted strip ────────────────────────────────────
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

  // ── Support bottom sheet — homepage pattern ────────────────────────────────
  void _showSupportOptions() {
    showModalBottomSheet(
      context: context,
      backgroundColor: const Color(0xFFF6F7F5),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Padding(
        padding: const EdgeInsets.fromLTRB(24, 12, 24, 32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Drag handle
            Container(
              width: 36,
              height: 4,
              margin: const EdgeInsets.only(bottom: 20),
              decoration: BoxDecoration(
                color: AppTheme.stoneGray,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            const Text(
              'Need help?',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w700,
                color: AppTheme.charcoalBlack,
                letterSpacing: -0.3,
              ),
            ),
            const SizedBox(height: 6),
            const Text(
              'Choose how you\'d like to get assistance:',
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w400,
                color: AppTheme.secondaryText,
              ),
            ),
            const SizedBox(height: 20),
            _buildSupportTile(
              context,
              icon: Icons.chat_bubble_outline_rounded,
              title: 'Chat with support',
              subtitle: 'Get help in real-time',
              onTap: () {
                Navigator.pop(context);
                _openChatSupport();
              },
            ),
            const SizedBox(height: 8),
            _buildSupportTile(
              context,
              icon: Icons.phone_outlined,
              title: 'Call support',
              subtitle: 'Speak with our team',
              onTap: () {
                Navigator.pop(context);
                _openCallSupport();
              },
            ),
            const SizedBox(height: 20),
            // 52px cancel button
            SizedBox(
              width: double.infinity,
              height: 52,
              child: OutlinedButton(
                onPressed: () => Navigator.pop(context),
                style: OutlinedButton.styleFrom(
                  side: BorderSide(color: AppTheme.stoneGray, width: 1.0),
                  foregroundColor: AppTheme.charcoalBlack,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
                child: const Text(
                  'Cancel',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.charcoalBlack,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSupportTile(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
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
          children: [
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: AppTheme.emeraldGreen.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: AppTheme.emeraldGreen, size: 20),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppTheme.charcoalBlack)),
                  const SizedBox(height: 2),
                  Text(subtitle, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w400, color: AppTheme.secondaryText)),
                ],
              ),
            ),
            const Icon(Icons.chevron_right_rounded, color: AppTheme.secondaryText, size: 18),
          ],
        ),
      ),
    );
  }
}

// ─── Legacy alias widgets (kept for backwards compat) ─────────────────────

/// Service Summary Card Widget
class ServiceSummaryCard extends StatelessWidget {
  final Service? service;
  final DateTime startTime;
  final DateTime endTime;
  final double amount;

  const ServiceSummaryCard({
    Key? key,
    required this.service,
    required this.startTime,
    required this.endTime,
    required this.amount,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final startStr = DateFormat('hh:mm a').format(startTime);
    final endStr = DateFormat('hh:mm a').format(endTime);

    return Container(
      height: 76,
      padding: const EdgeInsets.fromLTRB(14, 6, 14, 6),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFFF5FAF8), Color(0xFFF0F7F4)],
        ),
        borderRadius: BorderRadius.circular(16),
        boxShadow: AppTheme.cardShadow,
      ),
      child: Row(
        children: [
          Container(
            width: 22,
            height: 22,
            decoration: BoxDecoration(
              color: AppTheme.emeraldGreen.withOpacity(0.12),
              borderRadius: BorderRadius.circular(11),
            ),
            child: const Icon(Icons.home_repair_service_outlined,
                color: AppTheme.emeraldGreen, size: 14),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  service?.name ?? 'Home Service',
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.charcoalBlack,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${DateFormat('EEE, d MMM').format(startTime)} · $startStr–$endStr  ·  ₹${amount.toStringAsFixed(0)}/visit',
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                    color: Color(0xFF6B6B6B),
                    letterSpacing: 0.1,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// Worker Information Card Widget
class WorkerInformationCard extends StatelessWidget {
  final Worker worker;

  const WorkerInformationCard({Key? key, required this.worker})
    : super(key: key);

  @override
  Widget build(BuildContext context) {
    final workerName =
        '${worker.user.firstName} ${worker.user.lastName}'.trim();

    return Container(
      height: 68,
      padding: const EdgeInsets.fromLTRB(14, 6, 14, 6),
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
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: const BoxDecoration(
              shape: BoxShape.circle,
              color: AppTheme.emeraldGreen,
            ),
            child: Center(
              child: Text(
                worker.user.firstName.isNotEmpty
                    ? worker.user.firstName[0].toUpperCase()
                    : 'W',
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  workerName.isNotEmpty ? workerName : 'Professional',
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.charcoalBlack,
                  ),
                ),
                const SizedBox(height: 2),
                Row(
                  children: const [
                    Icon(Icons.verified_outlined,
                        color: AppTheme.emeraldGreen, size: 12),
                    SizedBox(width: 4),
                    Text(
                      'Verified Professional',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
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
    );
  }
}

/// Support Section Widget
class SupportSection extends StatelessWidget {
  final VoidCallback onHelpPressed;

  const SupportSection({Key? key, required this.onHelpPressed})
    : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onHelpPressed,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        height: 60,
        padding: const EdgeInsets.fromLTRB(14, 6, 10, 6),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFFF5FAF8), Color(0xFFF0F7F4)],
          ),
          borderRadius: BorderRadius.circular(16),
          boxShadow: AppTheme.cardShadow,
        ),
        child: Row(
          children: [
            Container(
              width: 22,
              height: 22,
              decoration: BoxDecoration(
                color: AppTheme.emeraldGreen.withOpacity(0.12),
                borderRadius: BorderRadius.circular(11),
              ),
              child: const Icon(Icons.help_outline_rounded,
                  color: AppTheme.emeraldGreen, size: 14),
            ),
            const SizedBox(width: 10),
            const Expanded(
              child: Text(
                'Need help?',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.charcoalBlack,
                ),
              ),
            ),
            const Icon(Icons.chevron_right_rounded,
                color: AppTheme.secondaryText, size: 18),
          ],
        ),
      ),
    );
  }
}
