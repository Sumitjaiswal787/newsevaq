
import re

with open(r"C:\Users\sumitjaiswal\Desktop\sevaq_new\SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0\worker_app_flutter\lib\screens\home_screen.dart", "r", encoding="utf-8") as f:
    content = f.read()

helper_method = """  DateTime _parseBookingDate(String dateStr, String timeStr) {
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
"""
content = content.replace("class _WorkerHomeScreenState extends State<WorkerHomeScreen> {", "class _WorkerHomeScreenState extends State<WorkerHomeScreen> {\n" + helper_method)

welcome_card_old = """        return Card(
          elevation: AppElevation.md,
          child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(AppRadius.md),
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  AppColors.primary.withOpacity(0.05),
                  AppColors.surface,
                ],
              ),
            ),"""
welcome_card_new = """        return Container(
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
            ),"""
content = content.replace(welcome_card_old, welcome_card_new)

content = content.replace("""            ),
          ),
        );
      },
    );
  }

  Widget _buildTodayJobsCard""", """            ),
        );
      },
    );
  }

  Widget _buildTodayJobsCard""")

today_jobs_old = """        return Card(
          elevation: AppElevation.md,
          child: Padding(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: Column("""
today_jobs_new = """        return Container(
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
            child: Column("""
content = content.replace(today_jobs_old, today_jobs_new)
content = content.replace(today_jobs_old.replace("TodayJobs", "Earnings"), today_jobs_new)

upcoming_jobs_old = """  Widget _buildUpcomingJobsSection(BuildContext context) {
    return Consumer<BookingProvider>(
      builder: (context, bookingProvider, _) {
        final upcomingJobs = [
          ...bookingProvider.pendingBookings,
          ...bookingProvider.inProgressBookings,
        ].take(5).toList();

        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,"""

upcoming_jobs_new = """  Widget _buildUpcomingJobsSection(BuildContext context) {
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
              mainAxisAlignment: MainAxisAlignment.spaceBetween,"""
content = content.replace(upcoming_jobs_old, upcoming_jobs_new)

upcoming_card_old = """    return Card(
      margin: const EdgeInsets.only(bottom: AppSpacing.sm),
      child: InkWell("""
upcoming_card_new = """    return Container(
      margin: const EdgeInsets.only(bottom: AppSpacing.sm),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.border, width: 1.0),
      ),
      child: InkWell("""
content = content.replace(upcoming_card_old, upcoming_card_new)

with open(r"C:\Users\sumitjaiswal\Desktop\sevaq_new\SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0\worker_app_flutter\lib\screens\home_screen.dart", "w", encoding="utf-8") as f:
    f.write(content)

