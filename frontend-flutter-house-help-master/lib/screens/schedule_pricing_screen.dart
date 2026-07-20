import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import '../models/worker.dart';
import '../models/service.dart';
import '../providers/auth_provider.dart';
import '../providers/location_provider.dart';
import '../services/api_service.dart';
import '../utils/service_mapper.dart';
import '../theme.dart';
import 'service_request_in_progress_screen.dart';

/// Schedule & Pricing Screen
/// Final flow specification implementation
/// Purpose: Collect unavoidable inputs (date, time, price acknowledgement) and prepare for real assignment
class SchedulePricingScreen extends StatefulWidget {
  final Worker? worker;
  final Service? service;
  final String?
  source; // 'ONE_TIME' for one-time visits, null/empty for subscription

  const SchedulePricingScreen({
    Key? key,
    this.worker,
    this.service,
    this.source,
  }) : super(key: key);

  @override
  State<SchedulePricingScreen> createState() => _SchedulePricingScreenState();
}

class _SchedulePricingScreenState extends State<SchedulePricingScreen> {
  late ApiService _apiService;
  AuthProvider? _authProvider;
  LocationProvider? _locationProvider;

  // State variables
  DateTime? _selectedDate;
  ServiceSlot? _selectedSlot;
  double? _calculatedPrice;
  bool _isProcessing = false;

  // Database worker slot availability variables
  List<String> _dbAvailableSlotTimes = [];
  bool _isLoadingSlots = false;
  bool _hasFetchedSlots = false;

  // Constants
  static const int MAX_DATE_PILLS = 7;
  static const double BASE_SERVICE_PRICE =
      49.0; // Base price for home cleaning service (matches new ₹49/hour rate)

  @override
  void initState() {
    super.initState();
    _apiService = ApiService();
    _selectedDate = _getEarliestViableDate();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _fetchAvailableSlots();
    });
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Try to get providers, but handle if they're not available
    debugPrint('SchedulePricingScreen: didChangeDependencies called');
    try {
      _authProvider = Provider.of<AuthProvider>(context, listen: false);
      debugPrint(
        'SchedulePricingScreen: AuthProvider obtained: ${_authProvider != null}',
      );
      debugPrint(
        'SchedulePricingScreen: AuthProvider user: ${_authProvider?.user?.email ?? "null"}',
      );
    } catch (e) {
      debugPrint('SchedulePricingScreen: AuthProvider not available: $e');
      _authProvider = null;
    }
    try {
      _locationProvider = Provider.of<LocationProvider>(context, listen: false);
      debugPrint(
        'SchedulePricingScreen: LocationProvider obtained: ${_locationProvider != null}',
      );
    } catch (e) {
      debugPrint('SchedulePricingScreen: LocationProvider not available: $e');
      _locationProvider = null;
    }
  }

  DateTime _getEarliestViableDate() {
    final now = DateTime.now();
    // Start from today for on-demand service
    return DateTime(now.year, now.month, now.day);
  }

  List<DateTime> _getAvailableDates() {
    final dates = <DateTime>[];
    final startDate = _getEarliestViableDate();

    for (int i = 0; i < MAX_DATE_PILLS; i++) {
      dates.add(startDate.add(Duration(days: i)));
    }
    return dates;
  }

  Future<void> _fetchAvailableSlots() async {
    if (_selectedDate == null) return;
    setState(() {
      _isLoadingSlots = true;
    });
    try {
      final dateStr = DateFormat('yyyy-MM-dd').format(_selectedDate!);
      final service = widget.service ??
          (widget.worker?.services.isNotEmpty == true
              ? widget.worker!.services[0]
              : null);
      if (service == null) return;
      
      final url = 'slots/available?date=$dateStr&serviceId=${service.id}${widget.worker != null ? '&workerId=${widget.worker!.id}' : ''}';
      final response = await _apiService.get(url);
      if (response is List) {
        final List<String> times = [];
        for (var item in response) {
          final startTimeStr = item['startTime'] as String?;
          if (startTimeStr != null) {
            final startTime = DateTime.parse(startTimeStr).toLocal();
            final formattedTime = DateFormat('hh:mm a').format(startTime);
            if (!times.contains(formattedTime)) {
              times.add(formattedTime);
            }
          }
        }
        setState(() {
          _dbAvailableSlotTimes = times;
          _hasFetchedSlots = true;
        });
      }
    } catch (e) {
      debugPrint('Error fetching slots: $e');
    } finally {
      setState(() {
        _isLoadingSlots = false;
      });
    }
  }

  void _calculatePrice() {
    if (_selectedDate != null && _selectedSlot != null) {
      final service =
          widget.service ??
          (widget.worker?.services.isNotEmpty == true
              ? widget.worker!.services[0]
              : null);
      final basePrice = service?.basePrice ?? BASE_SERVICE_PRICE;
      final surgeFee = _selectedSlot!.surgePrice;

      setState(() {
        _calculatedPrice = basePrice + surgeFee;
      });
    }
  }

  bool _canProceed() {
    return _selectedDate != null &&
        _selectedSlot != null &&
        _calculatedPrice != null &&
        !_isProcessing;
  }

  Future<void> _handleConfirmAssignment() async {
    print('🔍 DEBUG: _handleConfirmAssignment called');
    print('🔍 DEBUG: _canProceed() = ${_canProceed()}');

    if (!_canProceed()) return;

    setState(() => _isProcessing = true);

    try {
      if (_authProvider == null) {
        throw Exception('Authentication not available. Please log in again.');
      }
      final user = _authProvider!.user;
      print('🔍 DEBUG: AuthProvider user: ${user?.email ?? "null"}');
      print(
        '🔍 DEBUG: AuthProvider isAuthenticated: ${_authProvider!.isAuthenticated}',
      );
      if (user == null) {
        throw Exception('User not logged in');
      }

      // Validate location before proceeding
      if (_locationProvider == null ||
          _locationProvider!.currentLocationData == null) {
        throw Exception('Location not set. Please set your location first.');
      }

      // Check service availability for the selected location
      final location = _locationProvider!.currentLocationData!;
      final availabilityResponse = await _apiService.checkServiceAvailability(
        location.latitude ?? 0.0,
        location.longitude ?? 0.0,
        5.0, // 5km radius
      );

      if (availabilityResponse != null &&
          availabilityResponse['status'] == 'business_error') {
        // Service not available in this area
        throw Exception(
          'Service not available in your area. Please try a different location.',
        );
      }

      print(
        '🔍 DEBUG: User authenticated and location validated, proceeding with intent capture',
      );

      // Create Service Request (Intent Capture)
      final service =
          widget.service ??
          (widget.worker?.services.isNotEmpty == true
              ? widget.worker!.services[0]
              : null);

      final serviceRequestData = {
        'serviceId':
            (service?.id != null && service!.id > 0 ? service!.id : null) ??
            ServiceMapper.getRepresentativeBackendId('cleaning'),
        'date': DateFormat('yyyy-MM-dd').format(_selectedDate!),
        'timeWindow': _selectedSlot!.time,
        'location': {
          'lat': location.latitude,
          'lng': location.longitude,
          'address': location.address,
        },
        'priceSnapshot': _calculatedPrice,
        // Explicit source field for one-time visits
        if (widget.source != null && widget.source!.isNotEmpty)
          'source': widget.source,
        if (widget.worker != null) 'preferredWorkerId': widget.worker!.id,
      };

      print(
        '🔍 DEBUG: Creating service request with data: $serviceRequestData',
      );

      final serviceRequestResponse = await _apiService.post(
        'service-requests',
        serviceRequestData,
      );

      if (serviceRequestResponse != null &&
          serviceRequestResponse['requestId'] != null) {
        print(
          '🔍 DEBUG: Service request created successfully: ${serviceRequestResponse['requestId']}',
        );

        // Intent captured successfully - navigate to Service Request In Progress
        // Get AuthProvider before navigation
        final authProvider = Provider.of<AuthProvider>(context, listen: false);

        final startDateTime = _getSlotDateTime(_selectedDate!, _selectedSlot!.time);
        final endDateTime = startDateTime.add(Duration(hours: service?.duration ?? 2));

        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => MultiProvider(
              providers: [
                ChangeNotifierProvider<AuthProvider>.value(value: authProvider),
              ],
              child: ServiceRequestInProgressScreen(
                serviceRequestId: serviceRequestResponse['requestId'],
                service: service,
                startTime: startDateTime,
                endTime: endDateTime,
                amount: _calculatedPrice!,
              ),
            ),
          ),
        );
      } else {
        throw Exception(
          'Failed to create service request: Invalid response from server',
        );
      }
    } catch (e) {
      print('🔍 DEBUG: Error in _handleConfirmAssignment: ${e.toString()}');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error: ${e.toString()}'),
          backgroundColor: Colors.red,
        ),
      );
    } finally {
      setState(() => _isProcessing = false);
    }
  }

  DateTime _getSlotDateTime(DateTime date, String timeStr) {
    try {
      final cleanStr = timeStr.trim().toUpperCase();
      final isPM = cleanStr.endsWith('PM');
      final timeParts = cleanStr.replaceAll('AM', '').replaceAll('PM', '').trim().split(':');
      int hour = int.parse(timeParts[0]);
      int minute = timeParts.length > 1 ? int.parse(timeParts[1]) : 0;

      if (isPM && hour != 12) {
        hour += 12;
      } else if (!isPM && hour == 12) {
        hour = 0;
      }
      return DateTime(date.year, date.month, date.day, hour, minute);
    } catch (e) {
      return DateTime(date.year, date.month, date.day, 8, 0);
    }
  }

  bool _isSlotInPast(DateTime date, String timeStr) {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final target = DateTime(date.year, date.month, date.day);
    if (!target.isAtSameMomentAs(today)) {
      return false;
    }
    final slotDateTime = _getSlotDateTime(date, timeStr);
    return slotDateTime.isBefore(now);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final service = widget.service ??
        (widget.worker?.services.isNotEmpty == true
            ? widget.worker!.services[0]
            : null);
    // Generate standard 30-minute slots from 5:00 AM to 9:00 PM to match backend buffer logic
    List<ServiceSlot> baseSlots = [];
    DateTime start = DateTime(2000, 1, 1, 5, 0);
    DateTime end = DateTime(2000, 1, 1, 21, 0);
    while (start.isBefore(end) || start.isAtSameMomentAs(end)) {
      baseSlots.add(ServiceSlot(
        time: DateFormat('hh:mm a').format(start),
        surgePrice: 0.0,
        isAvailable: true,
      ));
      start = start.add(const Duration(minutes: 30));
    }

    final slots = baseSlots.map((slot) {
      if (!_hasFetchedSlots) {
        return slot; // Show all while fetching
      }
      final normalizedDbTimes = _dbAvailableSlotTimes.map((t) => t.replaceAll(' ', '').toLowerCase()).toList();
      final normalizedSlotTime = slot.time.replaceAll(' ', '').toLowerCase();
      final isPast = _isSlotInPast(_selectedDate ?? DateTime.now(), slot.time);
      final isAvailable = !isPast && normalizedDbTimes.contains(normalizedSlotTime);
      return ServiceSlot(
        time: slot.time,
        surgePrice: slot.surgePrice,
        isAvailable: isAvailable,
      );
    }).toList();
    final hasSurge = slots.any((s) => s.isAvailable && s.surgePrice > 0);

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
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(
                  horizontal: 24,
                  vertical: 16,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildHeader(theme),

                    const SizedBox(height: 28),

                    _buildDateSelection(theme),

                    const SizedBox(height: 24),

                    if (hasSurge) ...[
                      _buildSurgeBanner(),
                      const SizedBox(height: 24),
                    ],

                    _buildSlotsGrid(theme, slots),

                    const SizedBox(height: 24),

                    if (_selectedSlot != null) ...[
                      _buildPriceDisplay(theme),
                      const SizedBox(height: 24),
                      Divider(height: 1),
                    ],

                    _buildWhatsIncluded(theme),

                    const SizedBox(height: 24),
                  ],
                ),
              ),
            ),

            // 6️⃣ PRIMARY CTA (Fixed footer)
            _buildPrimaryCTA(theme),

            // 7️⃣ CTA SUBTEXT
            _buildCTASubtext(theme),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Schedule a one-time visit',
          style: TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.w700,
            color: AppTheme.charcoalBlack,
            letterSpacing: -0.5,
            height: 1.2,
          ),
        ),
        const SizedBox(height: 6),
        const Text(
          'Choose a preferred time window. This is a single visit, not a recurring service.',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w400,
            color: AppTheme.secondaryText,
            height: 1.5,
          ),
        ),
      ],
    );
  }

  Widget _buildDateSelection(ThemeData theme) {
    final dates = _getAvailableDates();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Date',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w700,
            color: AppTheme.charcoalBlack,
            letterSpacing: -0.1,
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 72,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: dates.length,
            separatorBuilder: (_, __) => const SizedBox(width: 8),
            itemBuilder: (context, index) {
              final date = dates[index];
              final isSelected =
                  _selectedDate?.day == date.day &&
                  _selectedDate?.month == date.month &&
                  _selectedDate?.year == date.year;
              final isToday = index == 0;

              return InkWell(
                onTap: () {
                  setState(() {
                    _selectedDate = date;
                    _selectedSlot = null;
                    _calculatedPrice = null;
                  });
                  _fetchAvailableSlots();
                },
                borderRadius: BorderRadius.circular(12),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  decoration: BoxDecoration(
                    // Selected: softGreen bg — Unselected: white surface
                    color: isSelected ? AppTheme.softGreen : Colors.white,
                    border: Border.all(
                      color: isSelected ? AppTheme.emeraldGreen : AppTheme.stoneGray,
                      width: isSelected ? 1.5 : 1.0,
                    ),
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: isSelected ? AppTheme.cardShadow : null,
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        isToday ? 'Today' : DateFormat('EEE').format(date),
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: isSelected ? AppTheme.emeraldGreen : AppTheme.secondaryText,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        DateFormat('d MMM').format(date),
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w700,
                          color: isSelected ? AppTheme.emeraldGreen : AppTheme.charcoalBlack,
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildSurgeBanner() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: const Color(0xFFFFF8E8),
        border: Border.all(color: AppTheme.warningColor, width: 1.0),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          Icon(Icons.trending_up_rounded, color: AppTheme.warningColor, size: 18),
          const SizedBox(width: 10),
          const Expanded(
            child: Text(
              'Surge fee applied on high demand hours',
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: AppTheme.charcoalBlack,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSlotsGrid(ThemeData theme, List<ServiceSlot> slots) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Select time',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w700,
            color: AppTheme.charcoalBlack,
            letterSpacing: -0.1,
          ),
        ),
        const SizedBox(height: 12),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
            mainAxisSpacing: 8,
            crossAxisSpacing: 8,
            childAspectRatio: 1.65,
          ),
          itemCount: slots.length,
          itemBuilder: (context, index) {
            final slot = slots[index];
            final isSelected = _selectedSlot?.time == slot.time;
            final isAvailable = slot.isAvailable;

            // Homepage design system card colors
            Color backgroundColor;
            Border border;
            List<BoxShadow>? shadow;

            if (!isAvailable) {
              // Disabled: stoneGray bg, no border, no shadow
              backgroundColor = AppTheme.stoneGray.withOpacity(0.4);
              border = Border.all(color: Colors.transparent);
              shadow = null;
            } else if (isSelected) {
              // Selected: softGreen bg + emerald border + shadow
              backgroundColor = AppTheme.softGreen;
              border = Border.all(color: AppTheme.emeraldGreen, width: 1.5);
              shadow = AppTheme.cardShadow;
            } else {
              // Available: white + stoneGray border
              backgroundColor = Colors.white;
              border = Border.all(color: AppTheme.stoneGray, width: 1.0);
              shadow = null;
            }

            return InkWell(
              onTap: isAvailable
                  ? () {
                      setState(() {
                        _selectedSlot = slot;
                        _calculatePrice();
                      });
                    }
                  : null,
              borderRadius: BorderRadius.circular(12),
              child: Container(
                decoration: BoxDecoration(
                  color: backgroundColor,
                  border: border,
                  borderRadius: BorderRadius.circular(12),
                  boxShadow: shadow,
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      slot.time,
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: !isAvailable
                            ? AppTheme.secondaryText.withOpacity(0.5)
                            : (isSelected ? AppTheme.emeraldGreen : AppTheme.charcoalBlack),
                        decoration: !isAvailable ? TextDecoration.lineThrough : null,
                        decorationColor: AppTheme.secondaryText.withOpacity(0.5),
                      ),
                    ),
                    if (isAvailable && slot.surgePrice > 0) ...[
                      const SizedBox(height: 3),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.trending_up_rounded,
                              color: AppTheme.warningColor, size: 11),
                          const SizedBox(width: 2),
                          Text(
                            '+₹${slot.surgePrice.toStringAsFixed(0)}',
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.w600,
                              color: isSelected ? AppTheme.emeraldGreen : AppTheme.warningColor,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ],
                ),
              ),
            );
          },
        ),
      ],
    );
  }

  Widget _buildPriceDisplay(ThemeData theme) {
    if (_calculatedPrice == null) return const SizedBox.shrink();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 16),
        const Text(
          'Service cost',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w700,
            color: AppTheme.charcoalBlack,
            letterSpacing: -0.1,
          ),
        ),
        const SizedBox(height: 8),
        // TrustLayer gradient card pattern
        Container(
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
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: AppTheme.emeraldGreen.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Icon(Icons.receipt_outlined,
                    color: AppTheme.emeraldGreen, size: 20),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '₹${_calculatedPrice!.toStringAsFixed(0)}  ·  ${widget.service?.duration ?? 2} hour visit',
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w700,
                        color: AppTheme.charcoalBlack,
                        letterSpacing: -0.3,
                      ),
                    ),
                    const SizedBox(height: 3),
                    const Text(
                      'Includes assignment, monitoring & support',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w400,
                        color: AppTheme.secondaryText,
                        height: 1.4,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildWhatsIncluded(ThemeData theme) {
    // Homepage muted chip pattern
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: [
        _buildIncludedChip(Icons.verified_outlined, 'Verified professional'),
        _buildIncludedChip(Icons.shield_outlined, 'Assigned & monitored'),
        _buildIncludedChip(Icons.autorenew_rounded, 'Replacement if required'),
        _buildIncludedChip(Icons.support_agent_outlined, 'Support throughout'),
      ],
    );
  }

  Widget _buildIncludedChip(IconData icon, String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 7),
      decoration: BoxDecoration(
        color: const Color(0xFFF0F1EF), // secondaryContainer — homepage chip bg
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 13, color: const Color(0xFF5F6361)),
          const SizedBox(width: 5),
          Text(
            label,
            style: const TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w400,
              color: Color(0xFF5F6361), // onSurfaceVariant
              height: 1.3,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPrimaryCTA(ThemeData theme) {
    return Container(
      padding: const EdgeInsets.fromLTRB(24, 12, 24, 16),
      decoration: BoxDecoration(
        color: const Color(0xFFF6F7F5),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.06),
            blurRadius: 16,
            offset: const Offset(0, -4),
          ),
        ],
      ),
      child: SizedBox(
        width: double.infinity,
        height: 52, // Spec-compliant 52px CTA
        child: ElevatedButton(
          onPressed: _canProceed() ? _handleConfirmAssignment : null,
          style: ElevatedButton.styleFrom(
            backgroundColor: AppTheme.emeraldGreen,
            disabledBackgroundColor: AppTheme.stoneGray,
            foregroundColor: Colors.white,
            disabledForegroundColor: AppTheme.secondaryText,
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
                  'Confirm & request professional',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                  ),
                ),
        ),
      ),
    );
  }

  Widget _buildCTASubtext(ThemeData theme) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 0, 24, 12),
      child: Opacity(
        opacity: 0.72,
        child: const Text(
          'Payment requested only after a professional is assigned.',
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w400,
            color: AppTheme.secondaryText,
          ),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}


