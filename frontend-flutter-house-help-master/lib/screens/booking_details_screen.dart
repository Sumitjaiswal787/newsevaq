import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/booking.dart';
import '../theme.dart';

class BookingDetailsScreen extends StatelessWidget {
  final Booking booking;

  const BookingDetailsScreen({Key? key, required this.booking})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: AppTheme.fogWhite,
      appBar: AppBar(
        backgroundColor: AppTheme.fogWhite,
        elevation: 0,
        scrolledUnderElevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.charcoalBlack),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Text(
          'Booking Details',
          style: theme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.w600,
            color: AppTheme.charcoalBlack,
          ),
        ),
        centerTitle: true,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 1. Prominent OTP Section at the top
              if (booking.otp != null && !booking.isOtpVerified) ...[
                _buildOtpCard(context),
                const SizedBox(height: 24),
              ],

              // 2. Service Details
              _buildServiceDetailsCard(context),
              const SizedBox(height: 24),

              // 3. Assigned Professional Card
              _buildProfessionalCard(context),
              const SizedBox(height: 24),

              // 4. Assurance Block (System Trust)
              _buildAssuranceCard(context),
              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildOtpCard(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: AppTheme.emeraldGreen,
        borderRadius: BorderRadius.circular(16),
        boxShadow: AppTheme.cardShadowEnhanced,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(
                Icons.lock_outline_rounded,
                color: Colors.white,
                size: 24,
              ),
              const SizedBox(width: 8),
              Text(
                'Start Service OTP',
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                  color: Colors.white,
                  letterSpacing: 0.5,
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  blurRadius: 8,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Text(
              booking.otp!,
              style: theme.textTheme.headlineLarge?.copyWith(
                fontWeight: FontWeight.bold,
                letterSpacing: 12,
                color: AppTheme.emeraldGreen,
              ),
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'Share this PIN with your professional\nto start the service.',
            style: theme.textTheme.bodyMedium?.copyWith(
              color: Colors.white.withOpacity(0.9),
              height: 1.4,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildProfessionalCard(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.stoneGray, width: 1.0),
        boxShadow: AppTheme.cardShadowEnhanced,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Assigned professional',
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
              color: AppTheme.charcoalBlack,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Container(
                width: 52,
                height: 52,
                decoration: BoxDecoration(
                  color: AppTheme.softGreen,
                  borderRadius: BorderRadius.circular(26),
                  border: Border.all(color: AppTheme.emeraldGreen.withOpacity(0.2), width: 1),
                ),
                child: Center(
                  child: Text(
                    booking.worker.user.firstName.isNotEmpty
                        ? booking.worker.user.firstName[0].toUpperCase()
                        : '?',
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.bold,
                      color: AppTheme.emeraldGreen,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '${booking.worker.user.firstName} ${booking.worker.user.lastName}'
                              .trim()
                              .isNotEmpty
                          ? '${booking.worker.user.firstName} ${booking.worker.user.lastName}'
                          : 'Professional',
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: AppTheme.charcoalBlack,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        const Icon(
                          Icons.star_rounded,
                          color: Color(0xFFFFB300),
                          size: 16,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          '${booking.worker.rating.toStringAsFixed(1)} (${booking.worker.reviewCount} reviews)',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: AppTheme.secondaryText,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Divider(color: AppTheme.stoneGray.withOpacity(0.5), height: 1),
          const SizedBox(height: 16),
          Text(
            'If needed, SEVAQ may assign another verified professional to ensure timely service.',
            style: theme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.secondaryText,
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildServiceDetailsCard(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.stoneGray, width: 1.0),
        boxShadow: AppTheme.cardShadowEnhanced,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Service Details',
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
              color: AppTheme.charcoalBlack,
            ),
          ),
          const SizedBox(height: 20),
          _buildDetailRow(
            Icons.calendar_today_outlined,
            DateFormat('EEEE, MMMM d, yyyy').format(booking.startTime),
            '${DateFormat('jm').format(booking.startTime)} - ${DateFormat('jm').format(booking.endTime)}',
            theme,
          ),
          const SizedBox(height: 16),
          _buildDetailRow(
            Icons.work_outline_rounded,
            booking.serviceName,
            null,
            theme,
          ),
          const SizedBox(height: 16),
          _buildDetailRow(
            Icons.payments_outlined,
            '₹${booking.amount?.toStringAsFixed(0) ?? (booking.service.basePrice * booking.endTime.difference(booking.startTime).inHours).toStringAsFixed(0)}',
            null,
            theme,
            isAmount: true,
          ),
        ],
      ),
    );
  }

  Widget _buildDetailRow(IconData icon, String title, String? subtitle, ThemeData theme, {bool isAmount = false}) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: AppTheme.fogWhite,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(
            icon,
            color: AppTheme.charcoalBlack.withOpacity(0.7),
            size: 20,
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 4),
              Text(
                title,
                style: theme.textTheme.bodyLarge?.copyWith(
                  fontWeight: isAmount ? FontWeight.bold : FontWeight.w500,
                  color: AppTheme.charcoalBlack,
                  fontSize: isAmount ? 18 : 16,
                ),
              ),
              if (subtitle != null) ...[
                const SizedBox(height: 4),
                Text(
                  subtitle,
                  style: theme.textTheme.bodyMedium?.copyWith(
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

  Widget _buildAssuranceCard(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppTheme.softGreen.withOpacity(0.5),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.emeraldGreen.withOpacity(0.1), width: 1),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Icon(
            Icons.verified_user_outlined,
            color: AppTheme.emeraldGreen,
            size: 24,
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Covered by SEVAQ service guarantee.',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: AppTheme.emeraldGreen,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'We’ll handle coordination, changes, and support.',
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: AppTheme.emeraldGreen.withOpacity(0.8),
                    height: 1.4,
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
