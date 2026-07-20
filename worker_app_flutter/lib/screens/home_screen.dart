import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../providers/booking_provider.dart';
import '../providers/earnings_provider.dart';
import '../constants/app_colors.dart';
import '../constants/app_spacing.dart';
import '../constants/app_radius.dart';
import '../constants/app_elevation.dart';
import '../widgets/status_chip.dart';
import '../widgets/section_header.dart';
import 'booking_detail_screen.dart';

class WorkerHomeScreen extends StatefulWidget {
  final VoidCallback? onViewAllJobs;
  const WorkerHomeScreen({super.key, this.onViewAllJobs});

  @override
  State<WorkerHomeScreen> createState() => _WorkerHomeScreenState();
}

class _WorkerHomeScreenState extends State<WorkerHomeScreen> {
  DateTime _parseBookingDate(String dateStr, String timeStr) {
    try {
      final date = DateTime.parse(dateStr);
      final parts = timeStr.split(":");
      if (parts.length >= 2) {
        return DateTime(date.year, date.month, date.day, int.parse(parts[0]), int.parse(parts[1]));
      }
      return date;
    } catch (_) {
      return DateTime.now();
    }
  }

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('SEVAQ Worker'),
        actions: [
          Consumer<AuthProvider>(
            builder: (context, auth, _) {
              return Padding(
                padding: const EdgeInsets.only(right: AppSpacing.md),
                child: _buildAvailabilityIndicator(auth.isAvailable),
              );
            },
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          await context.read<BookingProvider>().fetchBookings();
          await context.read<EarningsProvider>().fetchEarnings();
        },
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.all(AppSpacing.md),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildWelcomeCard(context),
              const SizedBox(height: AppSpacing.md),
              _buildTodayJobsCard(context),
              const SizedBox(height: AppSpacing.md),
              _buildOngoingJobsSection(context),
              const SizedBox(height: AppSpacing.md),
              _buildEarningsCard(context),
              const SizedBox(height: AppSpacing.md),
              _buildUpcomingJobsSection(context),
              const SizedBox(height: AppSpacing.lg),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildAvailabilityIndicator(bool isAvailable) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.sm,
        vertical: AppSpacing.xs,
      ),
      decoration: BoxDecoration(
        color:
            isAvailable ? AppColors.successSurface : AppColors.surfaceVariant,
        borderRadius: BorderRadius.circular(AppRadius.full),
        border: Border.all(
          color: isAvailable
              ? AppColors.success.withOpacity(0.3)
              : AppColors.border,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 8,
            height: 8,
            decoration: BoxDecoration(
              color: isAvailable ? AppColors.success : AppColors.textDisabled,
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: AppSpacing.xs),
          Text(
            isAvailable ? 'Online' : 'Offline',
            style: TextStyle(
              color: isAvailable ? AppColors.success : AppColors.textDisabled,
              fontSize: 12,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildWelcomeCard(BuildContext context) {
    return Consumer<AuthProvider>(
      builder: (context, auth, _) {
        final worker = auth.worker;
        final isAvailable = auth.isAvailable;

        return Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppColors.border, width: 1.0),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.015),
                  blurRadius: 8,
                  offset: const Offset(0, 3),
                ),
              ],
            ),
            child: Padding(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: Row(
                children: [
                  Container(
                    width: 64,
                    height: 64,
                    decoration: BoxDecoration(
                      color: AppColors.primarySurface,
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: AppColors.primary.withOpacity(0.2),
                        width: 2,
                      ),
                    ),
                    child: Icon(
                      Icons.person_rounded,
                      size: 32,
                      color: AppColors.primary,
                    ),
                  ),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Welcome, ${worker?.name ?? 'Worker'}!',
                          style:
                              Theme.of(context).textTheme.titleLarge?.copyWith(
                                    fontWeight: FontWeight.w600,
                                  ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: AppSpacing.xxs),
                        Row(
                          children: [
                            Icon(
                              Icons.work_outline,
                              size: 14,
                              color: AppColors.textSecondary,
                            ),
                            const SizedBox(width: AppSpacing.xxs),
                            Text(
                              '${worker?.totalJobs ?? 0} jobs completed',
                              style: Theme.of(context).textTheme.bodySmall,
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        isAvailable ? 'Available' : 'Away',
                        style: Theme.of(context).textTheme.labelSmall?.copyWith(
                              color: isAvailable
                                  ? AppColors.success
                                  : AppColors.textSecondary,
                            ),
                      ),
                      const SizedBox(height: AppSpacing.xxs),
                      Transform.scale(
                        scale: 0.85,
                        child: Switch(
                          value: isAvailable,
                          onChanged: (_) => auth.toggleAvailability(),
                          activeColor: AppColors.success,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
        );
      },
    );
  }

  Widget _buildTodayJobsCard(BuildContext context) {
    return Consumer<BookingProvider>(
      builder: (context, bookingProvider, _) {
        final pending = bookingProvider.pendingBookings.length;
        final inProgress = bookingProvider.inProgressBookings.length;
        final completed = bookingProvider.completedBookings
            .where(
              (b) => b.scheduledDate == DateTime.now().toString().split(' ')[0],
            )
            .length;

        return Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppColors.border, width: 1.0),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.015),
                  blurRadius: 8,
                  offset: const Offset(0, 3),
                ),
              ],
            ),
          child: Padding(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SectionHeader(
                  title: "Today's Jobs",
                  action: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: AppSpacing.sm,
                      vertical: AppSpacing.xxs,
                    ),
                    decoration: BoxDecoration(
                      color: AppColors.primarySurface,
                      borderRadius: BorderRadius.circular(AppRadius.full),
                    ),
                    child: Text(
                      '${pending + inProgress + completed}',
                      style: Theme.of(context).textTheme.labelSmall?.copyWith(
                            color: AppColors.primary,
                            fontWeight: FontWeight.w600,
                          ),
                    ),
                  ),
                ),
                const SizedBox(height: AppSpacing.md),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _buildJobStat(
                      context,
                      pending.toString(),
                      'New',
                      AppColors.pending,
                      Icons.fiber_new_outlined,
                    ),
                    _buildDivider(),
                    _buildJobStat(
                      context,
                      inProgress.toString(),
                      'Active',
                      AppColors.inProgress,
                      Icons.play_circle_outline,
                    ),
                    _buildDivider(),
                    _buildJobStat(
                      context,
                      completed.toString(),
                      'Done',
                      AppColors.completed,
                      Icons.check_circle_outline,
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildDivider() {
    return Container(
      height: 40,
      width: 1,
      color: AppColors.border,
    );
  }

  Widget _buildJobStat(
    BuildContext context,
    String value,
    String label,
    Color color,
    IconData icon,
  ) {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(AppSpacing.sm),
          decoration: BoxDecoration(
            color: color.withOpacity(0.1),
            shape: BoxShape.circle,
          ),
          child: Icon(icon, size: 20, color: color),
        ),
        const SizedBox(height: AppSpacing.sm),
        Text(
          value,
          style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                color: color,
                fontWeight: FontWeight.bold,
              ),
        ),
        const SizedBox(height: AppSpacing.xxs),
        Text(label, style: Theme.of(context).textTheme.bodySmall),
      ],
    );
  }

  Widget _buildEarningsCard(BuildContext context) {
    return Consumer<EarningsProvider>(
      builder: (context, earningsProvider, _) {
        final earnings = earningsProvider.earnings;
        return Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppColors.border, width: 1.0),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.015),
                  blurRadius: 8,
                  offset: const Offset(0, 3),
                ),
              ],
            ),
          child: Padding(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SectionHeader(
                  title: 'Earnings',
                  action: Icon(
                    Icons.account_balance_wallet_outlined,
                    size: 18,
                    color: AppColors.success,
                  ),
                ),
                const SizedBox(height: AppSpacing.md),
                Container(
                  padding: const EdgeInsets.all(AppSpacing.md),
                  decoration: BoxDecoration(
                    color: AppColors.successSurface,
                    borderRadius: BorderRadius.circular(AppRadius.sm),
                    border: Border.all(
                      color: AppColors.success.withOpacity(0.2),
                    ),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'This Month',
                            style: Theme.of(context).textTheme.bodySmall,
                          ),
                          const SizedBox(height: AppSpacing.xxs),
                          Text(
                            '₹${earnings?.thisMonth.toStringAsFixed(0) ?? '0'}',
                            style: Theme.of(context)
                                .textTheme
                                .headlineSmall
                                ?.copyWith(
                                  color: AppColors.success,
                                  fontWeight: FontWeight.bold,
                                ),
                          ),
                        ],
                      ),
                      Container(
                        height: 40,
                        width: 1,
                        color: AppColors.success.withOpacity(0.2),
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Last Month',
                            style: Theme.of(context).textTheme.bodySmall,
                          ),
                          const SizedBox(height: AppSpacing.xxs),
                          Text(
                            '₹${earnings?.lastMonth.toStringAsFixed(0) ?? '0'}',
                            style: Theme.of(context)
                                .textTheme
                                .titleMedium
                                ?.copyWith(
                                  color: AppColors.textSecondary,
                                ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildOngoingJobsSection(BuildContext context) {
    return Consumer<BookingProvider>(
      builder: (context, bookingProvider, _) {
        final ongoingJobs = bookingProvider.todayOngoingBookings;

        if (ongoingJobs.isEmpty) return const SizedBox.shrink();

        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SectionHeader(title: 'Ongoing Jobs'),
            const SizedBox(height: AppSpacing.sm),
            ...ongoingJobs.map(
              (booking) => _buildOngoingJobCard(context, booking),
            ),
          ],
        );
      },
    );
  }

  Widget _buildOngoingJobCard(BuildContext context, dynamic booking) {
    final statusColor = AppColors.inProgress;

    return Card(
      margin: const EdgeInsets.only(bottom: AppSpacing.sm),
      color: AppColors.inProgressSurface,
      child: InkWell(
        onTap: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (_) => WorkerBookingDetailScreen(booking: booking),
            ),
          );
        },
        borderRadius: BorderRadius.circular(AppRadius.md),
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.md),
          child: Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: statusColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(AppRadius.sm),
                ),
                child: Icon(
                  Icons.play_circle_filled,
                  color: statusColor,
                  size: 24,
                ),
              ),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      booking.serviceName,
                      style: Theme.of(context).textTheme.titleSmall?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: AppSpacing.xxs),
                    Row(
                      children: [
                        Icon(
                          Icons.access_time_filled,
                          size: 12,
                          color: AppColors.inProgress,
                        ),
                        const SizedBox(width: AppSpacing.xxs),
                        Text(
                          booking.endTime != null && booking.endTime!.isNotEmpty
                              ? '${booking.startTime} - ${booking.endTime}'
                              : booking.startTime,
                          style:
                              Theme.of(context).textTheme.bodySmall?.copyWith(
                                    color: AppColors.inProgress,
                                    fontWeight: FontWeight.w500,
                                  ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(width: AppSpacing.sm),
              ElevatedButton(
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (_) =>
                          WorkerBookingDetailScreen(booking: booking),
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.inProgress,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppSpacing.md,
                    vertical: AppSpacing.sm,
                  ),
                ),
                child: const Text('View'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildUpcomingJobsSection(BuildContext context) {
    return Consumer<BookingProvider>(
      builder: (context, bookingProvider, _) {
        final allUpcoming = bookingProvider.pendingBookings.toList();
        allUpcoming.sort((a, b) {
          final dateA = _parseBookingDate(a.scheduledDate, a.startTime);
          final dateB = _parseBookingDate(b.scheduledDate, b.startTime);
          return dateA.compareTo(dateB);
        });

        bool isStartingSoon = false;
        dynamic startingSoonJob;
        if (allUpcoming.isNotEmpty) {
          final now = DateTime.now();
          final nextJobTime = _parseBookingDate(allUpcoming.first.scheduledDate, allUpcoming.first.startTime);
          final diff = nextJobTime.difference(now).inMinutes;
          if (diff >= 0 && diff <= 20) {
            isStartingSoon = true;
            startingSoonJob = allUpcoming.first;
          }
        }

        final upcomingJobs = allUpcoming.take(5).toList();

        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (isStartingSoon && startingSoonJob != null) ...[
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppColors.warningSurface,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.warning.withOpacity(0.5)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.timer, color: AppColors.warning),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "Upcoming Soon!",
                            style: Theme.of(context).textTheme.titleSmall?.copyWith(
                              color: AppColors.warning,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            "${startingSoonJob.serviceName} is starting in 20 minutes or less.",
                            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              color: AppColors.warning,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.md),
            ],
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                SectionHeader(title: 'Upcoming Jobs'),
                if (upcomingJobs.isNotEmpty)
                  TextButton(
                    onPressed: widget.onViewAllJobs,
                    child: const Text('View All'),
                  ),
              ],
            ),
            const SizedBox(height: AppSpacing.sm),
            if (upcomingJobs.isEmpty)
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(AppSpacing.xxl),
                  child: Center(
                    child: Column(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(AppSpacing.lg),
                          decoration: BoxDecoration(
                            color: AppColors.surfaceVariant,
                            shape: BoxShape.circle,
                          ),
                          child: Icon(
                            Icons.calendar_today_outlined,
                            size: 40,
                            color: AppColors.textDisabled,
                          ),
                        ),
                        const SizedBox(height: AppSpacing.md),
                        Text(
                          'No upcoming jobs',
                          style:
                              Theme.of(context).textTheme.titleSmall?.copyWith(
                                    color: AppColors.textSecondary,
                                  ),
                        ),
                        const SizedBox(height: AppSpacing.xxs),
                        Text(
                          'New jobs will appear here when assigned',
                          style: Theme.of(context).textTheme.bodySmall,
                        ),
                      ],
                    ),
                  ),
                ),
              )
            else
              ...upcomingJobs.map(
                (booking) => _buildUpcomingJobCard(context, booking),
              ),
          ],
        );
      },
    );
  }

  Widget _buildUpcomingJobCard(BuildContext context, dynamic booking) {
    final isPending = booking.isPending;
    final statusColor = isPending ? AppColors.pending : AppColors.inProgress;

    return Container(
      margin: const EdgeInsets.only(bottom: AppSpacing.sm),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.border, width: 1.0),
      ),
      child: InkWell(
        onTap: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (_) => WorkerBookingDetailScreen(booking: booking),
            ),
          );
        },
        borderRadius: BorderRadius.circular(AppRadius.md),
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.md),
          child: Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: statusColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(AppRadius.sm),
                ),
                child: Icon(
                  isPending ? Icons.fiber_new : Icons.play_circle,
                  color: statusColor,
                  size: 24,
                ),
              ),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      booking.serviceName,
                      style: Theme.of(context).textTheme.titleSmall?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: AppSpacing.xxs),
                    Row(
                      children: [
                        Icon(
                          Icons.calendar_today_outlined,
                          size: 12,
                          color: AppColors.textSecondary,
                        ),
                        const SizedBox(width: AppSpacing.xxs),
                        Text(
                          '${booking.scheduledDate} at ${booking.startTime}',
                          style: Theme.of(context).textTheme.bodySmall,
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(width: AppSpacing.sm),
              StatusChip.fromBookingStatus(booking.status, isCompact: true),
            ],
          ),
        ),
      ),
    );
  }
}
