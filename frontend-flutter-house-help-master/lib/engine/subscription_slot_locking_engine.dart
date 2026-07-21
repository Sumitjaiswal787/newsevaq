import 'dart:math';

// ============================================================================
// 1. ENUMS & CONSTANTS
// ============================================================================

enum ShiftType { morning, evening }

enum SubscriptionType {
  breakfast,
  lunch,
  breakfastAndLunch,
  dinner,
  lunchAndDinner,
}

class ShiftWindow {
  final String startTime; // "05:00"
  final String endTime;   // "12:00"

  const ShiftWindow({required this.startTime, required this.endTime});

  int get startMinutes => _parseMinutes(startTime);
  int get endMinutes => _parseMinutes(endTime);

  static int _parseMinutes(String timeStr) {
    final parts = timeStr.split(':');
    return int.parse(parts[0]) * 60 + int.parse(parts[1]);
  }
}

class ShiftConstants {
  static const ShiftWindow morning = ShiftWindow(startTime: '05:00', endTime: '12:00');
  static const ShiftWindow evening = ShiftWindow(startTime: '16:00', endTime: '21:00');
}

// ============================================================================
// 2. PRODUCTION DART MODELS
// ============================================================================

class LocationCoordinates {
  final double latitude;
  final double longitude;

  const LocationCoordinates({required this.latitude, required this.longitude});

  /// Haversine Distance Calculation (Kilometers)
  double distanceTo(LocationCoordinates other) {
    const double earthRadiusKm = 6371.0;
    final double dLat = _toRadians(other.latitude - latitude);
    final double dLon = _toRadians(other.longitude - longitude);

    final double a = sin(dLat / 2) * sin(dLat / 2) +
        cos(_toRadians(latitude)) *
            cos(_toRadians(other.latitude)) *
            sin(dLon / 2) *
            sin(dLon / 2);

    final double c = 2 * atan2(sqrt(a), sqrt(1 - a));
    return earthRadiusKm * c;
  }

  static double _toRadians(double degree) => degree * pi / 180.0;
}

class WorkerModel {
  final String id;
  final String name;
  final double rating;
  final int bookingsTodayCount;
  final DateTime lastBookingEndedAt;
  final LocationCoordinates currentLocation;
  final List<WorkerShiftModel> shifts;
  final List<WorkerLeaveModel> leaves;
  final List<WorkerBreakModel> breaks;

  WorkerModel({
    required this.id,
    required this.name,
    required this.rating,
    required this.bookingsTodayCount,
    required this.lastBookingEndedAt,
    required this.currentLocation,
    required this.shifts,
    required this.leaves,
    required this.breaks,
  });
}

class WorkerShiftModel {
  final ShiftType shiftType;
  final String startTime; // "05:00"
  final String endTime;   // "12:00"

  WorkerShiftModel({
    required this.shiftType,
    required this.startTime,
    required this.endTime,
  });
}

class WorkerLeaveModel {
  final DateTime date;
  final ShiftType? fullOrPartialShift;

  WorkerLeaveModel({required this.date, this.fullOrPartialShift});
}

class WorkerBreakModel {
  final String startTime; // "08:00"
  final String endTime;   // "08:30"

  WorkerBreakModel({required this.startTime, required this.endTime});
}

class TimeSlotInterval {
  final String startTime; // "07:00"
  final int serviceDurationMinutes;
  final int travelBufferMinutes;
  final int cleaningBufferMinutes;

  TimeSlotInterval({
    required this.startTime,
    required this.serviceDurationMinutes,
    this.travelBufferMinutes = 20,
    this.cleaningBufferMinutes = 10,
  });

  int get startMinutes => _parseMinutes(startTime);

  /// Total reserved time: service + travel + cleaning
  int get totalReservedMinutes =>
      serviceDurationMinutes + travelBufferMinutes + cleaningBufferMinutes;

  int get endMinutes => startMinutes + totalReservedMinutes;

  String get endTime {
    final endH = (endMinutes ~/ 60).toString().padLeft(2, '0');
    final endM = (endMinutes % 60).toString().padLeft(2, '0');
    return '$endH:$endM';
  }

  static int _parseMinutes(String timeStr) {
    final parts = timeStr.split(':');
    final h = int.parse(parts[0]);
    final m = int.parse(parts[1]);
    return h * 60 + m;
  }

  /// Canonical Overlap Formula: existing.start < new.end AND existing.end > new.start
  bool overlapsWithRaw(int otherStartMinutes, int otherEndMinutes) {
    return startMinutes < otherEndMinutes && endMinutes > otherStartMinutes;
  }

  bool overlapsWith(TimeSlotInterval other) {
    return overlapsWithRaw(other.startMinutes, other.endMinutes);
  }
}

class BookingModel {
  final String id;
  final String workerId;
  final String customerId;
  final DateTime date;
  final TimeSlotInterval interval;
  final LocationCoordinates location;

  BookingModel({
    required this.id,
    required this.workerId,
    required this.customerId,
    required this.date,
    required this.interval,
    required this.location,
  });
}

// ============================================================================
// 3. DYNAMIC CAPACITY ENGINE
// ============================================================================

class CapacityEngine {
  /// Calculates maximum job capacity for a shift based on duration & buffers
  static int calculateShiftMaxCapacity({
    required ShiftWindow shift,
    required int averageServiceMinutes,
    int travelBufferMinutes = 20,
    int cleaningBufferMinutes = 10,
  }) {
    final shiftLengthMinutes = shift.endMinutes - shift.startMinutes;
    final totalJobMinutes =
        averageServiceMinutes + travelBufferMinutes + cleaningBufferMinutes;
    return (shiftLengthMinutes / totalJobMinutes).floor();
  }

  /// Evaluates remaining booking capacity for a worker on a target shift
  static int calculateRemainingCapacity({
    required WorkerModel worker,
    required ShiftWindow shift,
    required DateTime date,
    required List<BookingModel> existingBookingsToday,
    required int averageServiceMinutes,
  }) {
    final maxCapacity = calculateShiftMaxCapacity(
      shift: shift,
      averageServiceMinutes: averageServiceMinutes,
    );

    final shiftBookingsCount = existingBookingsToday.where((b) {
      if (b.workerId != worker.id) return false;
      return b.interval.startMinutes >= shift.startMinutes &&
          b.interval.endMinutes <= shift.endMinutes;
    }).length;

    return max(0, maxCapacity - shiftBookingsCount);
  }
}

// ============================================================================
// 4. WORKER RANKING & ROUTE OPTIMIZATION ENGINE (8-TIER)
// ============================================================================

class RankedWorker {
  final WorkerModel worker;
  final double distanceKm;
  final double estimatedTravelMinutes;
  final bool isTravelFeasible;

  RankedWorker({
    required this.worker,
    required this.distanceKm,
    required this.estimatedTravelMinutes,
    required this.isTravelFeasible,
  });
}

class WorkerRankingEngine {
  /// Ranks candidate workers according to 8-Tier Priority Strategy
  static List<RankedWorker> rankWorkers({
    required List<WorkerModel> candidateWorkers,
    required LocationCoordinates customerLocation,
    required List<BookingModel> existingBookingsToday,
    required DateTime targetDate,
    required TimeSlotInterval newInterval,
  }) {
    final List<RankedWorker> rankedList = [];

    for (final worker in candidateWorkers) {
      final workerBookings = existingBookingsToday
          .where((b) => b.workerId == worker.id)
          .toList();

      LocationCoordinates referenceLocation = worker.currentLocation;
      bool isFeasible = true;
      double travelMinutes = 0.0;

      if (workerBookings.isNotEmpty) {
        workerBookings.sort((a, b) =>
            a.interval.endMinutes.compareTo(b.interval.endMinutes));

        final priorBookings = workerBookings
            .where((b) => b.interval.endMinutes <= newInterval.startMinutes)
            .toList();

        if (priorBookings.isNotEmpty) {
          final lastBooking = priorBookings.last;
          referenceLocation = lastBooking.location;

          final double dist = referenceLocation.distanceTo(customerLocation);
          travelMinutes = (dist / 20.0) * 60; // 20 km/h avg urban speed

          // Travel Feasibility Check: previousBookingEnd + travelTime <= newBookingStart
          if (lastBooking.interval.endMinutes + travelMinutes >
              newInterval.startMinutes) {
            isFeasible = false;
          }
        }
      } else {
        final double dist = referenceLocation.distanceTo(customerLocation);
        travelMinutes = (dist / 20.0) * 60;
      }

      final double distanceKm = referenceLocation.distanceTo(customerLocation);

      rankedList.add(RankedWorker(
        worker: worker,
        distanceKm: distanceKm,
        estimatedTravelMinutes: travelMinutes,
        isTravelFeasible: isFeasible,
      ));
    }

    // Filter out travel-infeasible workers
    final feasibleWorkers =
        rankedList.where((rw) => rw.isTravelFeasible).toList();

    // 8-Tier Sorting Strategy
    feasibleWorkers.sort((a, b) {
      // Priority 4: Nearest to customer's location / previous booking
      final int distComp = a.distanceKm.compareTo(b.distanceKm);
      if (distComp != 0) return distComp;

      // Priority 5: Shortest travel time
      final int travelComp =
          a.estimatedTravelMinutes.compareTo(b.estimatedTravelMinutes);
      if (travelComp != 0) return travelComp;

      // Priority 6: Least workload today
      final int bookingsComp =
          a.worker.bookingsTodayCount.compareTo(b.worker.bookingsTodayCount);
      if (bookingsComp != 0) return bookingsComp;

      // Priority 7: Highest Rating
      final int ratingComp = b.worker.rating.compareTo(a.worker.rating);
      if (ratingComp != 0) return ratingComp;

      // Priority 8: Longest Idle Time
      return a.worker.lastBookingEndedAt
          .compareTo(b.worker.lastBookingEndedAt);
    });

    return feasibleWorkers;
  }
}

// ============================================================================
// 5. TIME-BASED CAPACITY LOCKING ENGINE
// ============================================================================

class TimeBasedCapacityLockingEngine {
  /// Evaluates worker eligibility for a precise time interval (service + travel + buffer)
  static bool isWorkerAvailableForInterval({
    required WorkerModel worker,
    required DateTime date,
    required TimeSlotInterval interval,
    required List<BookingModel> existingBookings,
  }) {
    // 1. Check Leave
    final isOnLeave = worker.leaves.any((l) =>
        l.date.year == date.year &&
        l.date.month == date.month &&
        l.date.day == date.day);
    if (isOnLeave) return false;

    // 2. Check Breaks
    for (final b in worker.breaks) {
      final breakPartsStart = b.startTime.split(':');
      final breakPartsEnd = b.endTime.split(':');
      final breakStart =
          int.parse(breakPartsStart[0]) * 60 + int.parse(breakPartsStart[1]);
      final breakEnd =
          int.parse(breakPartsEnd[0]) * 60 + int.parse(breakPartsEnd[1]);

      if (interval.overlapsWithRaw(breakStart, breakEnd)) return false;
    }

    // 3. Check Existing Booking Overlaps (TIME-BASED LOCKING)
    final workerBookings =
        existingBookings.where((b) => b.workerId == worker.id);
    for (final booking in workerBookings) {
      if (interval.overlapsWith(booking.interval)) return false;
    }

    return true;
  }

  /// Calculates dynamic slot availability count for UI rendering
  static Map<String, int> calculateRealtimeSlotAvailability({
    required List<String> uiTimeSlots,
    required int serviceDurationMinutes,
    required List<WorkerModel> allWorkers,
    required DateTime date,
    required List<BookingModel> existingBookings,
  }) {
    final Map<String, int> availabilityMap = {};

    for (final slotStart in uiTimeSlots) {
      final interval = TimeSlotInterval(
        startTime: slotStart,
        serviceDurationMinutes: serviceDurationMinutes,
      );

      int availableWorkerCount = 0;
      for (final worker in allWorkers) {
        if (isWorkerAvailableForInterval(
          worker: worker,
          date: date,
          interval: interval,
          existingBookings: existingBookings,
        )) {
          availableWorkerCount++;
        }
      }

      availabilityMap[slotStart] = availableWorkerCount;
    }

    return availabilityMap;
  }

  /// Assigns single worker for single or dual subscriptions (Breakfast + Lunch / Lunch + Dinner)
  static WorkerModel? assignWorker({
    required SubscriptionType subscriptionType,
    required DateTime date,
    required TimeSlotInterval morningInterval,
    required TimeSlotInterval? eveningInterval,
    required LocationCoordinates customerLocation,
    required List<WorkerModel> allWorkers,
    required List<BookingModel> existingBookings,
  }) {
    final isDualSubscription =
        subscriptionType == SubscriptionType.breakfastAndLunch ||
            subscriptionType == SubscriptionType.lunchAndDinner;

    if (isDualSubscription) {
      if (eveningInterval == null &&
          subscriptionType == SubscriptionType.lunchAndDinner) {
        return null;
      }

      final secondInterval = eveningInterval ?? morningInterval;

      // Filter workers available for BOTH booking windows
      final candidateWorkers = allWorkers.where((worker) {
        final morningAvailable = isWorkerAvailableForInterval(
          worker: worker,
          date: date,
          interval: morningInterval,
          existingBookings: existingBookings,
        );

        final secondAvailable = isWorkerAvailableForInterval(
          worker: worker,
          date: date,
          interval: secondInterval,
          existingBookings: existingBookings,
        );

        return morningAvailable && secondAvailable;
      }).toList();

      if (candidateWorkers.isEmpty) {
        // DO NOT SPLIT BOOKING -> Return null ("No Worker Available")
        return null;
      }

      final ranked = WorkerRankingEngine.rankWorkers(
        candidateWorkers: candidateWorkers,
        customerLocation: customerLocation,
        existingBookingsToday: existingBookings,
        targetDate: date,
        newInterval: morningInterval,
      );

      return ranked.isEmpty ? null : ranked.first.worker;
    } else {
      // Single Booking (Breakfast / Lunch / Dinner)
      final candidateWorkers = allWorkers.where((worker) {
        return isWorkerAvailableForInterval(
          worker: worker,
          date: date,
          interval: morningInterval,
          existingBookings: existingBookings,
        );
      }).toList();

      if (candidateWorkers.isEmpty) return null;

      final ranked = WorkerRankingEngine.rankWorkers(
        candidateWorkers: candidateWorkers,
        customerLocation: customerLocation,
        existingBookingsToday: existingBookings,
        targetDate: date,
        newInterval: morningInterval,
      );

      return ranked.isEmpty ? null : ranked.first.worker;
    }
  }
}
