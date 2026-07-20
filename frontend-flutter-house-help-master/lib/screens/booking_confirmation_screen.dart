import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/booking.dart';
import '../widgets/booking_status_timeline.dart';
import '../theme.dart';


class BookingConfirmationScreen extends StatelessWidget {
  final Booking? booking;

  const BookingConfirmationScreen({Key? key, this.booking}) : super(key: key);

  // Method to extract booking from route arguments
  Booking? _getBookingFromArgs(BuildContext context) {
    final args =
        ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?;
    if (args != null && args['booking'] != null) {
      final bookingData = args['booking'];
      if (bookingData is Booking) {
        return bookingData;
      } else if (bookingData is Map<String, dynamic>) {
        // Parse from JSON
        try {
          return Booking.fromJson(bookingData);
        } catch (e) {
          debugPrint('Error parsing booking from args: $e');
        }
      }
    }
    return null;
  }

  // Helper method to parse time with date fallback
  DateTime _parseTime(DateTime? time, DateTime? date) {
    if (time != null) {
      return time;
    }
    if (date != null) {
      return DateTime(date.year, date.month, date.day, 9, 0); // Default 9 AM
    }
    return DateTime.now();
  }

  // Factory constructor to handle both widget parameter and route arguments
  factory BookingConfirmationScreen.fromRoute(BuildContext context) {
    final args =
        ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?;
    if (args != null && args['booking'] != null) {
      return BookingConfirmationScreen(
        key: args['key'] as Key?,
        booking: args['booking'] is Booking ? args['booking'] as Booking : null,
      );
    }
    return const BookingConfirmationScreen(booking: null);
  }

  @override
  Widget build(BuildContext context) {
    // If booking is null, try to get it from route arguments
    final effectiveBooking = booking ?? _getBookingFromArgs(context);

    if (effectiveBooking == null) {
      return Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.error_outline, size: 64, color: Colors.red[300]),
              SizedBox(height: 16),
              Text(
                'Booking data not found',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              SizedBox(height: 8),
              ElevatedButton(
                onPressed: () =>
                    Navigator.of(context).popUntil((route) => route.isFirst),
                child: Text('Go Home'),
              ),
            ],
          ),
        ),
      );
    }

    final theme = Theme.of(context);
    final displayBooking = effectiveBooking;

    // Debug: Log the date values
    debugPrint('=== BOOKING CONFIRMATION SCREEN DEBUG ===');
    debugPrint('Booking ID: ${displayBooking.id}');
    debugPrint('Booking startTime: ${displayBooking.startTime}');
    debugPrint('Booking endTime: ${displayBooking.endTime}');
    debugPrint('Display date: ${displayBooking.startTime}');
    debugPrint('===========================================');

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.black87),
          onPressed: () =>
              Navigator.of(context).popUntil((route) => route.isFirst),
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
              // Success header
              const SizedBox(height: 24),
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppTheme.softGreen,
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: const Icon(
                      Icons.check_circle,
                      color: AppTheme.emeraldGreen,
                      size: 32,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Your service is scheduled',
                          style: theme.textTheme.headlineMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: AppTheme.charcoalBlack,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Your booking is confirmed. Here are the details for your service.',
                          style: theme.textTheme.bodyMedium?.copyWith(
                            color: AppTheme.secondaryText,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 24),



              const SizedBox(height: 24),

              // Assigned Professional Card
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
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
                    Text(
                      'Assigned professional',
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: AppTheme.charcoalBlack,
                      ),
                    ),
                    const SizedBox(height: 12),

                    // Professional details
                    Row(
                      children: [
                        Container(
                          width: 48,
                          height: 48,
                          decoration: BoxDecoration(
                            color: AppTheme.softGreen,
                            borderRadius: BorderRadius.circular(24),
                          ),
                          child: Center(
                            child: Text(
                              displayBooking.worker.user.firstName.isNotEmpty
                                  ? displayBooking.worker.user.firstName[0]
                                  : '?',
                              style: const TextStyle(
                                fontSize: 20,
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
                                '${displayBooking.worker.user.firstName} ${displayBooking.worker.user.lastName}'.trim().isNotEmpty
                                    ? '${displayBooking.worker.user.firstName} ${displayBooking.worker.user.lastName}'.trim()
                                    : 'Professional',
                                style: theme.textTheme.titleMedium?.copyWith(
                                  fontWeight: FontWeight.bold,
                                  color: AppTheme.charcoalBlack,
                                ),
                              ),
                              Row(
                                children: [
                                  const Icon(Icons.star, color: Colors.amber, size: 16),
                                  const SizedBox(width: 4),
                                  Text(
                                    '4.8 (120+ jobs)',
                                    style: theme.textTheme.bodyMedium?.copyWith(
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
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Service Details
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
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
                    Text(
                      'Service Details',
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: AppTheme.charcoalBlack,
                      ),
                    ),
                    const SizedBox(height: 12),

                    Row(
                      children: [
                        const Icon(
                          Icons.calendar_today_outlined,
                          color: AppTheme.charcoalBlack,
                          size: 20,
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                DateFormat(
                                  'EEEE, MMMM d, yyyy',
                                ).format(displayBooking.startTime),
                                style: theme.textTheme.bodyMedium?.copyWith(
                                  fontWeight: FontWeight.w600,
                                  color: AppTheme.charcoalBlack,
                                ),
                              ),
                              Text(
                                '${DateFormat('jm').format(displayBooking.startTime)} - ${DateFormat('jm').format(displayBooking.endTime)}',
                                style: theme.textTheme.bodyMedium?.copyWith(
                                  color: AppTheme.secondaryText,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),

                    const SizedBox(height: 8),

                    Row(
                      children: [
                        const Icon(Icons.work_outline_rounded, color: AppTheme.charcoalBlack, size: 20),
                        const SizedBox(width: 12),
                        Text(
                          displayBooking.serviceName,
                          style: theme.textTheme.bodyMedium?.copyWith(
                            color: AppTheme.charcoalBlack,
                          ),
                        ),
                      ],
                    ),

                    const SizedBox(height: 8),


                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Assurance Block (System Trust)
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppTheme.softGreen.withOpacity(0.5),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppTheme.emeraldGreen.withOpacity(0.1), width: 1.0),
                ),
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
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: AppTheme.emeraldGreen.withOpacity(0.8),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
      // CTA pinned at the bottom
      Container(
        padding: const EdgeInsets.symmetric(
          horizontal: 24,
          vertical: 16,
        ),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: const Offset(0, -2),
            ),
          ],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  // Navigate directly to HomeScreen instead of going back to SplashScreen
                  Navigator.of(context).pushReplacementNamed('/home');
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.emeraldGreen,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  elevation: 0,
                  textStyle: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                child: const Text('Done'),
              ),
            ),
          ],
        ),
      ),
    ],
  ),
),
    );
  }
}
