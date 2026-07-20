import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../theme.dart';
import '../providers/booking_provider.dart';
import '../providers/auth_provider.dart';
import '../models/booking.dart';
import '../models/subscription.dart';
import 'dart:async';
import 'dart:math' as math;
import '../widgets/pre_service_reminder_banner.dart';
import '../widgets/subscription_reminder_banner.dart';
import '../widgets/booking_type_badge.dart';
import 'booking_details_screen.dart';

/// Redesigned HistoryScreen complying with the Sevaq Design System.
/// Replaces hardcoded purple themes with AppTheme emeraldGreen, softGreen,
/// charcoalBlack, and stoneGray tokens, with improved spacing and clean typography.
class HistoryScreen extends StatefulWidget {
  const HistoryScreen({super.key});

  @override
  State<HistoryScreen> createState() => _HistoryScreenState();
}

class _HistoryScreenState extends State<HistoryScreen> {
  bool _showActiveBookings = true;
  Timer? _pollingTimer;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<BookingProvider>(
        context,
        listen: false,
      ).fetchBookingsAndSubscriptions(context: context);
    });

    // Setup polling every 10 seconds for live updates
    _pollingTimer = Timer.periodic(const Duration(seconds: 10), (_) {
      if (mounted) {
        Provider.of<BookingProvider>(
          context,
          listen: false,
        ).fetchBookingsAndSubscriptions(context: context, silent: true);
      }
    });
  }

  @override
  void dispose() {
    _pollingTimer?.cancel();
    super.dispose();
  }

  String _getStatusLabel(BookingStatus status) {
    switch (status) {
      case BookingStatus.assignmentInProgress:
        return 'Assignment in progress';
      case BookingStatus.scheduled:
        return 'Scheduled';
      case BookingStatus.confirmed:
        return 'Confirmed';
      case BookingStatus.inProgress:
        return 'In progress';
      case BookingStatus.completed:
        return 'Completed';
      case BookingStatus.cancelled:
        return 'Cancelled';
    }
  }

  Color _getStatusColor(BookingStatus status) {
    switch (status) {
      case BookingStatus.assignmentInProgress:
        return const Color(0xFFEF6C00); // Warning/attention orange
      case BookingStatus.scheduled:
      case BookingStatus.confirmed:
      case BookingStatus.inProgress:
        return AppTheme.emeraldGreen;
      case BookingStatus.completed:
        return AppTheme.emeraldGreen.withOpacity(0.6);
      case BookingStatus.cancelled:
        return AppTheme.secondaryText;
    }
  }

  String _getCustomPlanDisplayText(Subscription subscription) {
    final serviceType = subscription.serviceType.toUpperCase();
    final customPlanData = subscription.customPlanData!;

    if (serviceType == 'COOKING' || serviceType == 'COOK') {
      final persons = customPlanData['numberOfPeople'] ?? 1;
      final mealPlan = customPlanData['mealPlan'] ?? 'all';
      return '$persons person(s), $mealPlan';
    } else if (serviceType == 'CLEANING') {
      final bhk = customPlanData['bhk'] ?? 1;
      return '$bhk BHK';
    } else if (serviceType == 'MAID' || serviceType == 'MAID_SERVICE') {
      return 'Maid Service';
    }
    return 'Custom Plan';
  }

  String _getPriceLabel(Booking booking) {
    if (booking.amount == null || booking.amount == 0) {
      return 'Price pending';
    }
    if (booking.isPaid) {
      return '₹${booking.amount?.toInt()} paid';
    }
    return 'Estimated ₹${booking.amount?.toInt()}';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.fogWhite,
      appBar: AppBar(
        title: const Text(
          'Operations',
          style: TextStyle(
            color: AppTheme.charcoalBlack,
            fontWeight: FontWeight.w700,
            fontSize: 20,
          ),
        ),
        backgroundColor: AppTheme.fogWhite,
        elevation: 0,
        scrolledUnderElevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.charcoalBlack),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Column(
        children: [
          Builder(
            builder: (context) => PreServiceReminderBanner(
              authProvider: Provider.of<AuthProvider>(context, listen: false),
              bookingProvider: Provider.of<BookingProvider>(
                context,
                listen: false,
              ),
            ),
          ),
          const SubscriptionReminderBanner(),
          _buildTabSelector(),
          Expanded(
            child: Consumer<BookingProvider>(
              builder: (context, provider, _) {
                if (provider.isLoading) {
                  return const Center(
                    child: CircularProgressIndicator(
                      color: AppTheme.emeraldGreen,
                    ),
                  );
                }

                final hasSubscriptions = provider.subscriptions.isNotEmpty;
                
                final activeBookings = provider.bookings
                    .where((b) =>
                        b.status != BookingStatus.completed &&
                        b.status != BookingStatus.cancelled &&
                        b.bookingType != BookingType.subscription)
                    .toList();
                
                final previousBookings = provider.bookings
                    .where((b) =>
                        b.status == BookingStatus.completed ||
                        b.status == BookingStatus.cancelled)
                    .toList();

                final targetBookings = _showActiveBookings ? activeBookings : previousBookings;
                final hasBookings = targetBookings.isNotEmpty;

                if ((!_showActiveBookings || !hasSubscriptions) && !hasBookings) {
                  return Center(
                    child: Text(
                      _showActiveBookings
                          ? 'No active bookings found.'
                          : 'No previous bookings found.',
                      style: const TextStyle(
                        fontSize: 15,
                        color: AppTheme.secondaryText,
                      ),
                    ),
                  );
                }

                return ListView(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                  children: [
                    // Subscriptions Section (Only show on Active tab)
                    if (_showActiveBookings && hasSubscriptions) ...[
                      _buildSubscriptionsSection(provider.subscriptions),
                      const SizedBox(height: 24),
                      const Divider(color: AppTheme.stoneGray, height: 1),
                      const SizedBox(height: 24),
                    ],

                    // Bookings Section
                    if (hasBookings) ...[
                      _buildBookingsSection(
                        targetBookings,
                        provider.subscriptions,
                        _showActiveBookings ? 'Active Bookings' : 'Previous Bookings',
                      ),
                    ] else if (_showActiveBookings) ...[
                      const Padding(
                        padding: EdgeInsets.symmetric(vertical: 24),
                        child: Text(
                          'Your upcoming bookings will appear here once they are scheduled.',
                          style: TextStyle(color: AppTheme.secondaryText, fontSize: 13),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ],
                  ],
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSubscriptionsSection(List<Subscription> subscriptions) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: const [
                Icon(Icons.autorenew_rounded, color: AppTheme.emeraldGreen, size: 22),
                SizedBox(width: 8),
                Text(
                  'My Subscriptions',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    color: AppTheme.charcoalBlack,
                  ),
                ),
              ],
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: AppTheme.softGreen,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                '${subscriptions.length} active',
                style: const TextStyle(
                  color: AppTheme.emeraldGreen,
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        ...subscriptions.map((sub) => _buildSubscriptionCard(sub)),
      ],
    );
  }

  Widget _buildSubscriptionCard(Subscription subscription) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppTheme.stoneGray, width: 1.0),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.015),
            blurRadius: 8,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: InkWell(
          onTap: () => _navigateToSubscriptionDetails(subscription),
          splashColor: AppTheme.softGreen,
          highlightColor: AppTheme.softGreen.withOpacity(0.5),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Title and status badge
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        subscription.serviceName,
                        style: const TextStyle(
                          fontWeight: FontWeight.w700,
                          fontSize: 16,
                          color: AppTheme.charcoalBlack,
                        ),
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: subscription.isActive
                            ? AppTheme.softGreen
                            : AppTheme.stoneGray,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        subscription.statusDisplay,
                        style: TextStyle(
                          color: subscription.isActive
                              ? AppTheme.emeraldGreen
                              : AppTheme.secondaryText,
                          fontWeight: FontWeight.w600,
                          fontSize: 10,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),

                // Details Grid / List
                _infoRow(
                  Icons.calendar_today_outlined,
                  'Start Date: ${DateFormat('MMM d, yyyy').format(subscription.startDate)}',
                ),
                const SizedBox(height: 6),
                _infoRow(
                  Icons.event_busy_outlined,
                  'End Date: ${subscription.endDate != null ? DateFormat('MMM d, yyyy').format(subscription.endDate!) : 'Ongoing'}',
                ),
                const SizedBox(height: 6),
                _infoRow(
                  Icons.access_time_rounded,
                  'Time Slot: ${subscription.timeWindowDisplay}',
                ),
                const SizedBox(height: 6),
                _infoRow(Icons.payments_outlined, subscription.priceDisplay),

                if (subscription.customPlanData != null) ...[
                  const SizedBox(height: 6),
                  _infoRow(Icons.info_outline_rounded, _getCustomPlanDisplayText(subscription)),
                ],

                if (subscription.workerName != null) ...[
                  const SizedBox(height: 6),
                  _infoRow(Icons.person_outline_rounded, subscription.workerName!, valueColor: AppTheme.emeraldGreen, isBold: true),
                ],

                const SizedBox(height: 6),
                _infoRow(Icons.repeat_rounded, 'Daily visits included'),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _infoRow(IconData icon, String text, {Color? valueColor, bool isBold = false}) {
    return Row(
      children: [
        Icon(icon, color: AppTheme.secondaryText, size: 14),
        const SizedBox(width: 8),
        Expanded(
          child: Text(
            text,
            style: TextStyle(
              color: valueColor ?? AppTheme.secondaryText,
              fontWeight: isBold ? FontWeight.w600 : FontWeight.w400,
              fontSize: 12,
            ),
          ),
        ),
      ],
    );
  }

  void _navigateToSubscriptionDetails(Subscription subscription) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      backgroundColor: Colors.white,
      builder: (context) => _buildSubscriptionDetailsSheet(subscription),
    );
  }

  Widget _buildSubscriptionDetailsSheet(Subscription subscription) {
    return Container(
      padding: const EdgeInsets.fromLTRB(24, 20, 24, 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Subscription Details',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                  color: AppTheme.charcoalBlack,
                ),
              ),
              IconButton(
                icon: const Icon(Icons.close, color: AppTheme.secondaryText),
                onPressed: () => Navigator.pop(context),
              ),
            ],
          ),
          const Divider(color: AppTheme.stoneGray, height: 16),
          const SizedBox(height: 8),
          _buildDetailRow('Service', subscription.serviceName),
          _buildDetailRow('Status', subscription.status),
          _buildDetailRow(
            'Start Date',
            DateFormat('MMM d, yyyy').format(subscription.startDate),
          ),
          _buildDetailRow('Time Window', subscription.timeWindowDisplay),
          _buildDetailRow('Price', subscription.priceDisplay),
          const Divider(color: AppTheme.stoneGray, height: 24),
          if (subscription.workerName != null) ...[
            const Text(
              'Assigned Professional',
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: AppTheme.secondaryText,
              ),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Container(
                  width: 40,
                  height: 40,
                  decoration: const BoxDecoration(
                    color: AppTheme.softGreen,
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.person_outline_rounded, color: AppTheme.emeraldGreen),
                ),
                const SizedBox(width: 12),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      subscription.workerName!,
                      style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: AppTheme.charcoalBlack,
                      ),
                    ),
                    if (subscription.workerPhone != null)
                      Text(
                        subscription.workerPhone!,
                        style: const TextStyle(color: AppTheme.secondaryText, fontSize: 12),
                      ),
                  ],
                ),
              ],
            ),
          ] else ...[
            const Text(
              'Professional will be assigned soon',
              style: TextStyle(
                fontSize: 13,
                color: AppTheme.secondaryText,
                fontStyle: FontStyle.italic,
              ),
            ),
          ],
          const SizedBox(height: 16),
        ],
      ),
    );
  }

  Widget _buildDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 13, color: AppTheme.secondaryText)),
          Text(
            value,
            style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppTheme.charcoalBlack),
          ),
        ],
      ),
    );
  }

  Widget _buildTabSelector() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      child: Container(
        height: 48,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppTheme.stoneGray, width: 1.0),
        ),
        child: Row(
          children: [
            Expanded(
              child: GestureDetector(
                onTap: () {
                  setState(() {
                    _showActiveBookings = true;
                  });
                },
                child: Container(
                  decoration: BoxDecoration(
                    color: _showActiveBookings ? AppTheme.emeraldGreen : Colors.transparent,
                    borderRadius: BorderRadius.circular(15),
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    'Active',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w700,
                      color: _showActiveBookings ? Colors.white : AppTheme.secondaryText,
                    ),
                  ),
                ),
              ),
            ),
            Expanded(
              child: GestureDetector(
                onTap: () {
                  setState(() {
                    _showActiveBookings = false;
                  });
                },
                child: Container(
                  decoration: BoxDecoration(
                    color: !_showActiveBookings ? AppTheme.emeraldGreen : Colors.transparent,
                    borderRadius: BorderRadius.circular(15),
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    'Previous',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w700,
                      color: !_showActiveBookings ? Colors.white : AppTheme.secondaryText,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBookingsSection(
    List<Booking> bookings,
    List<Subscription> subscriptions,
    String title,
  ) {
    final Map<DateTime, List<Booking>> bookingsByDate = {};
    for (final booking in bookings) {
      final date = DateTime(
        booking.startTime.year,
        booking.startTime.month,
        booking.startTime.day,
      );
      if (!bookingsByDate.containsKey(date)) {
        bookingsByDate[date] = [];
      }
      bookingsByDate[date]!.add(booking);
    }

    final sortedDates = bookingsByDate.keys.toList()
      ..sort((a, b) => b.compareTo(a)); // Sort latest dates first for convenience

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            const Icon(Icons.calendar_month_outlined, color: AppTheme.charcoalBlack, size: 22),
            const SizedBox(width: 8),
            Text(
              title,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w700,
                color: AppTheme.charcoalBlack,
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        ...sortedDates.map((date) {
          final dateBookings = bookingsByDate[date]!;
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 8),
                child: Text(
                  DateFormat('EEEE, MMM d').format(date),
                  style: const TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w700,
                    color: AppTheme.charcoalBlack,
                  ),
                ),
              ),
              ...dateBookings.map(
                (booking) => _buildBookingCard(booking, subscriptions),
              ),
              const SizedBox(height: 8),
            ],
          );
        }).toList(),
      ],
    );
  }

  Widget _buildBookingCard(Booking booking, List<Subscription> subscriptions) {
    final displayServiceName = booking.serviceName;

    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => BookingDetailsScreen(booking: booking),
          ),
        );
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppTheme.stoneGray, width: 1.0),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.015),
              blurRadius: 8,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Text(
                    displayServiceName,
                    style: const TextStyle(
                      fontWeight: FontWeight.w700,
                      fontSize: 16,
                      color: AppTheme.charcoalBlack,
                    ),
                  ),
                ),
                BookingTypeBadge(booking: booking),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              '${DateFormat('h:mm').format(booking.startTime)}–${DateFormat('h:mm a').format(booking.endTime)}',
              style: const TextStyle(fontSize: 12, color: AppTheme.secondaryText),
            ),
            const SizedBox(height: 12),
            if (booking.worker.user.firstName.isNotEmpty) ...[
              Row(
                children: [
                  const Icon(Icons.person_outline_rounded, color: AppTheme.secondaryText, size: 14),
                  const SizedBox(width: 6),
                  Text(
                    '${booking.worker.user.firstName} ${booking.worker.user.lastName}',
                    style: const TextStyle(fontSize: 12, color: AppTheme.secondaryText),
                  ),
                  const SizedBox(width: 10),
                  const Icon(Icons.star_rounded, color: Color(0xFFFFB300), size: 14),
                  const SizedBox(width: 2),
                  Text(
                    booking.worker.rating.toStringAsFixed(1),
                    style: const TextStyle(fontSize: 12, color: AppTheme.secondaryText, fontWeight: FontWeight.w600),
                  ),
                ],
              ),
              const SizedBox(height: 12),
            ],
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Expanded(
                  child: Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    crossAxisAlignment: WrapCrossAlignment.center,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: _getStatusColor(booking.status).withOpacity(0.08),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          _getStatusLabel(booking.status),
                          style: TextStyle(
                            color: _getStatusColor(booking.status),
                            fontWeight: FontWeight.w600,
                            fontSize: 10,
                          ),
                        ),
                      ),
                      if (booking.isOtpRequired && !booking.isOtpVerified && booking.otp != null && booking.status != BookingStatus.inProgress && booking.status != BookingStatus.completed && booking.status != BookingStatus.cancelled) ...[
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: AppTheme.primaryContainer,
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            'Start PIN: ${booking.otp}',
                            style: const TextStyle(
                              color: AppTheme.emeraldGreen,
                              fontWeight: FontWeight.bold,
                              fontSize: 10,
                            ),
                          ),
                        ),
                      ],
                      if (booking.status == BookingStatus.inProgress) ...[
                        _InlineJobTimer(startedAt: booking.startedAt),
                        if (booking.completionOtp != null && !booking.isCompletionOtpVerified) ...[
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: AppTheme.primaryContainer,
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text(
                              'Completion PIN: ${booking.completionOtp}',
                              style: const TextStyle(
                                color: AppTheme.emeraldGreen,
                                fontWeight: FontWeight.bold,
                                fontSize: 10,
                              ),
                            ),
                          ),
                        ],
                      ],
                    ],
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  _getPriceLabel(booking),
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: booking.amount == null || booking.amount == 0
                        ? AppTheme.secondaryText
                        : AppTheme.charcoalBlack,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _InlineJobTimer extends StatefulWidget {
  final DateTime? startedAt;
  const _InlineJobTimer({Key? key, this.startedAt}) : super(key: key);

  @override
  State<_InlineJobTimer> createState() => _InlineJobTimerState();
}

class _InlineJobTimerState extends State<_InlineJobTimer> {
  late Timer _timer;
  int _remainingSeconds = 3600;

  @override
  void initState() {
    super.initState();
    _calculateRemainingTime();
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (mounted) {
        _calculateRemainingTime();
      }
    });
  }

  void _calculateRemainingTime() {
    if (widget.startedAt == null) {
      setState(() {
        _remainingSeconds = 3600;
      });
      return;
    }
    
    final endTime = widget.startedAt!.add(const Duration(minutes: 60));
    final difference = endTime.difference(DateTime.now()).inSeconds;

    setState(() {
      _remainingSeconds = math.max(0, difference);
    });
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final minutes = (_remainingSeconds / 60).floor();
    final seconds = _remainingSeconds % 60;
    final timeString = '${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}';

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: AppTheme.emeraldGreen.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: AppTheme.emeraldGreen.withOpacity(0.3), width: 1),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(
            Icons.timer_outlined,
            size: 12,
            color: AppTheme.emeraldGreen,
          ),
          const SizedBox(width: 4),
          Text(
            timeString,
            style: const TextStyle(
              color: AppTheme.emeraldGreen,
              fontWeight: FontWeight.w700,
              fontSize: 10,
            ),
          ),
        ],
      ),
    );
  }
}

