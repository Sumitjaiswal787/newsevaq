import 'package:flutter/material.dart';
import '../services/sound_service.dart';
import '../constants/app_colors.dart';
import '../constants/app_spacing.dart';
import '../constants/app_radius.dart';

class NewBookingDialogData {
  final String bookingId;
  final String serviceName;
  final String serviceDate;
  final String startTime;
  final String customerName;
  final String? customerAddress;
  final String price;

  NewBookingDialogData({
    required this.bookingId,
    required this.serviceName,
    required this.serviceDate,
    required this.startTime,
    required this.customerName,
    this.customerAddress,
    required this.price,
  });

  factory NewBookingDialogData.fromMap(Map<String, dynamic> data) {
    String extract(List<String> keys, String defaultValue) {
      for (final key in keys) {
        if (data.containsKey(key) &&
            data[key] != null &&
            data[key].toString().trim().isNotEmpty) {
          return data[key].toString().trim();
        }
      }
      return defaultValue;
    }

    final rawPrice = extract(['price', 'totalPrice', 'total_price', 'amount'], '0')
        .replaceAll('₹', '')
        .trim();

    return NewBookingDialogData(
      bookingId: extract(['bookingId', 'booking_id', 'id'], ''),
      serviceName: extract(['serviceName', 'service_name', 'service', 'title'], 'Home Service'),
      serviceDate: extract(['serviceDate', 'service_date', 'date', 'scheduledDate', 'scheduled_date'], ''),
      startTime: extract(['startTime', 'start_time', 'time'], ''),
      customerName: extract(['customerName', 'customer_name', 'userName', 'user_name', 'customer'], 'Customer'),
      customerAddress: data['customerAddress']?.toString() ?? data['customer_address']?.toString() ?? data['address']?.toString(),
      price: rawPrice.isEmpty ? '0' : rawPrice,
    );
  }
}

class NewBookingDialog extends StatefulWidget {
  final NewBookingDialogData data;
  final VoidCallback onViewDetails;

  const NewBookingDialog({
    super.key,
    required this.data,
    required this.onViewDetails,
  });

  @override
  State<NewBookingDialog> createState() => _NewBookingDialogState();
}

class _NewBookingDialogState extends State<NewBookingDialog>
    with SingleTickerProviderStateMixin {
  final SoundService _soundService = SoundService();
  bool _isPlaying = false;
  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 400),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(begin: 0.8, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.elasticOut),
    );
    _animationController.forward();
    _playNotificationSound();
  }

  @override
  void dispose() {
    _stopAudio();
    _animationController.dispose();
    super.dispose();
  }

  Future<void> _playNotificationSound() async {
    try {
      setState(() {
        _isPlaying = true;
      });
      await _soundService.playNewBookingSound();
      debugPrint('Playing notification sound from SoundService');
    } catch (e) {
      debugPrint('Error playing notification sound: $e');
    }
  }

  Future<void> _stopAudio() async {
    if (_isPlaying) {
      try {
        await _soundService.stop();
      } catch (e) {
        debugPrint('Error stopping audio: $e');
      }
      setState(() {
        _isPlaying = false;
      });
    }
  }

  void _dismissDialog() {
    _stopAudio();
    Navigator.of(context).pop();
  }

  void _viewDetails() {
    _stopAudio();
    Navigator.of(context).pop();
    widget.onViewDetails();
  }

  @override
  Widget build(BuildContext context) {
    return ScaleTransition(
      scale: _scaleAnimation,
      child: Dialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadius.lg),
        ),
        child: Container(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Success icon with pulsing animation indicator
              Stack(
                alignment: Alignment.center,
                children: [
                  Container(
                    padding: const EdgeInsets.all(AppSpacing.lg),
                    decoration: BoxDecoration(
                      color: AppColors.successSurface,
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(
                      Icons.check_circle,
                      size: 48,
                      color: AppColors.success,
                    ),
                  ),
                  if (_isPlaying)
                    Positioned(
                      top: 0,
                      right: 0,
                      child: Container(
                        padding: const EdgeInsets.all(AppSpacing.xs),
                        decoration: const BoxDecoration(
                          color: AppColors.error,
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(
                          Icons.volume_up,
                          size: 14,
                          color: Colors.white,
                        ),
                      ),
                    ),
                ],
              ),
              const SizedBox(height: AppSpacing.md),

              // Title
              Text(
                'नया काम मिला!',
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
              ),
              const SizedBox(height: AppSpacing.xs),

              // Subtitle
              Text(
                'You have a new booking',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppColors.textSecondary,
                    ),
              ),
              const SizedBox(height: AppSpacing.lg),

              // Booking details card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(AppSpacing.md),
                decoration: BoxDecoration(
                  color: AppColors.surfaceVariant,
                  borderRadius: BorderRadius.circular(AppRadius.md),
                  border: Border.all(color: AppColors.border),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildDetailRow(Icons.cleaning_services_outlined,
                        widget.data.serviceName.isEmpty ? 'Home Service' : widget.data.serviceName),
                    const SizedBox(height: AppSpacing.sm),
                    _buildDetailRow(
                      Icons.calendar_today_outlined,
                      (widget.data.serviceDate.isNotEmpty && widget.data.startTime.isNotEmpty)
                          ? '${widget.data.serviceDate} at ${widget.data.startTime}'
                          : (widget.data.serviceDate.isNotEmpty
                              ? widget.data.serviceDate
                              : (widget.data.startTime.isNotEmpty
                                  ? widget.data.startTime
                                  : 'Scheduled Service')),
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    _buildDetailRow(
                        Icons.person_outline,
                        widget.data.customerName.isEmpty ? 'Customer' : widget.data.customerName),
                    if (widget.data.customerAddress != null &&
                        widget.data.customerAddress!.isNotEmpty) ...[
                      const SizedBox(height: AppSpacing.sm),
                      _buildDetailRow(Icons.location_on_outlined,
                          widget.data.customerAddress!),
                    ],
                    const SizedBox(height: AppSpacing.md),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        Text(
                          widget.data.price.startsWith('₹')
                              ? widget.data.price
                              : '₹${widget.data.price}',
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
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.lg),

              // Action buttons
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: _dismissDialog,
                      style: OutlinedButton.styleFrom(
                        padding:
                            const EdgeInsets.symmetric(vertical: AppSpacing.md),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(AppRadius.md),
                        ),
                      ),
                      child: const Text('Later'),
                    ),
                  ),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: _viewDetails,
                      style: ElevatedButton.styleFrom(
                        padding:
                            const EdgeInsets.symmetric(vertical: AppSpacing.md),
                        backgroundColor: AppColors.success,
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(AppRadius.md),
                        ),
                      ),
                      child: const Text('View Details'),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDetailRow(IconData icon, String text) {
    return Row(
      children: [
        Icon(icon, size: 18, color: AppColors.textSecondary),
        const SizedBox(width: AppSpacing.sm),
        Expanded(
          child: Text(
            text,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: AppColors.textPrimary,
                ),
          ),
        ),
      ],
    );
  }
}
