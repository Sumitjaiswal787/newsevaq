import 'dart:math';

// ============================================================================
// 1. ENUMS & CONSTANTS
// ============================================================================

enum ShiftType { morning, evening }

enum SubscriptionType { breakfast, lunch, breakfastAndLunch, dinner, lunchAndDinner }

class ShiftWindow {
  final String startTime; // "05:00"
  final String endTime;   // "12:00"

  const ShiftWindow({required this.startTime, required this.endTime});
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

class BookingTimeInterval {
  final String start; // "07:00"
  final String end;   // "08:00"

  BookingTimeInterval({required this.start, required this.end});

  int get startMinutes => _parseMinutes(start);
  int get endMinutes => _parseMinutes(end);

  static int _parseMinutes(String timeStr) {
    final parts = timeStr.split(':');
    final h = int.parse(parts[0]);
    final m = int.parse(parts[1]);
    return h * 60 + m;
  }

  /// Canonical Overlap Formula: existing.start < new.end AND existing.end > new.start
  bool overlapsWith(BookingTimeInterval other) {
    return startMinutes < other.endMinutes && endMinutes > other.startMinutes;
  }
}

class BookingModel {
  final String id;
  final String workerId;
  final String customerId;
  final DateTime date;
  final BookingTimeInterval interval;
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

class SubscriptionLockModel {
  final String id;
  final String subscriptionId;
  final String workerId;
  final DateTime date;
  final ShiftType shiftType;

  SubscriptionLockModel({
    required this.id,
    required this.subscriptionId,
    required this.workerId,
    required this.date,
    required this.shiftType,
  });
}

// ============================================================================
// 3. WORKER RANKING METRIC & ALGORITHM
// ============================================================================

class RankedWorker {
  final WorkerModel worker;
  final double distanceKm;
  final double estimatedTravelMinutes;

  RankedWorker({
    required this.worker,
    required this.distanceKm,
    required this.estimatedTravelMinutes,
  });
}

class WorkerRankingEngine {
  /// Ranks candidate workers according to Priority 1 -> Priority 7
  static List<RankedWorker> rankWorkers({
    required List<WorkerModel> candidateWorkers,
    required LocationCoordinates customerLocation,
    required List<BookingModel> existingBookingsToday,
    required DateTime targetDate,
    required BookingTimeInterval newInterval,
  }) {
    final List<RankedWorker> rankedList = [];

    for (final worker in candidateWorkers) {
      // Find worker's previous booking closest before the new interval
      final workerBookings = existingBookingsToday
          .where((b) => b.workerId == worker.id)
          .toList();

      LocationCoordinates referenceLocation = worker.currentLocation;
      if (workerBookings.isNotEmpty) {
        // Sort by end time ascending
        workerBookings.sort((a, b) =>
            a.interval.endMinutes.compareTo(b.interval.endMinutes));

        // Find the last booking ending prior to newInterval.startMinutes
        final priorBookings = workerBookings
            .where((b) => b.interval.endMinutes <= newInterval.startMinutes)
            .toList();

        if (priorBookings.isNotEmpty) {
          referenceLocation = priorBookings.last.location;
        }
      }

      final double dist = referenceLocation.distanceTo(customerLocation);
      final double travelTimeMinutes = (dist / 20.0) * 60; // 20 km/h avg urban speed

      rankedList.add(RankedWorker(
        worker: worker,
        distanceKm: dist,
        estimatedTravelMinutes: travelTimeMinutes,
      ));
    }

    // Sort according to 7-tier ranking strategy
    rankedList.sort((a, b) {
      // Priority 4: Nearest to customer location / previous booking
      final int distComp = a.distanceKm.compareTo(b.distanceKm);
      if (distComp != 0) return distComp;

      // Priority 5: Least travel time
      final int travelComp =
          a.estimatedTravelMinutes.compareTo(b.estimatedTravelMinutes);
      if (travelComp != 0) return travelComp;

      // Priority 6: Least bookings today
      final int bookingsComp =
          a.worker.bookingsTodayCount.compareTo(b.worker.bookingsTodayCount);
      if (bookingsComp != 0) return bookingsComp;

      // Priority 7: Highest Rating
      final int ratingComp = b.worker.rating.compareTo(a.worker.rating);
      if (ratingComp != 0) return ratingComp;

      // Tiebreaker: Longest idle time
      return a.worker.lastBookingEndedAt
          .compareTo(b.worker.lastBookingEndedAt);
    });

    return rankedList;
  }
}

// ============================================================================
// 4. SUBSCRIPTION SLOT LOCKING ENGINE
// ============================================================================

class SubscriptionSlotLockingEngine {
  /// Evaluates worker eligibility for a single booking interval
  static bool isWorkerAvailableForSlot({
    required WorkerModel worker,
    required DateTime date,
    required BookingTimeInterval interval,
    required List<BookingModel> existingBookings,
    required List<SubscriptionLockModel> existingLocks,
  }) {
    // 1. Check leave
    final isOnLeave = worker.leaves.any((l) =>
        l.date.year == date.year &&
        l.date.month == date.month &&
        l.date.day == date.day);
    if (isOnLeave) return false;

    // 2. Check breaks
    for (final b in worker.breaks) {
      final breakInterval = BookingTimeInterval(start: b.startTime, end: b.endTime);
      if (interval.overlapsWith(breakInterval)) return false;
    }

    // 3. Check existing booking overlaps
    final workerBookings =
        existingBookings.where((b) => b.workerId == worker.id);
    for (final booking in workerBookings) {
      if (interval.overlapsWith(booking.interval)) return false;
    }

    // 4. Check subscription locks
    final isMorningSlot = interval.startMinutes < 12 * 60;
    final targetShift = isMorningSlot ? ShiftType.morning : ShiftType.evening;

    final hasLockConflict = existingLocks.any((lock) =>
        lock.workerId == worker.id &&
        lock.date.year == date.year &&
        lock.date.month == date.month &&
        lock.date.day == date.day &&
        lock.shiftType == targetShift);

    if (hasLockConflict) return false;

    return true;
  }

  /// Calculates dynamic slot availability count across all time slots
  static Map<String, int> calculateRealtimeSlotAvailability({
    required List<String> uiTimeSlots,
    required int serviceDurationMinutes,
    required List<WorkerModel> allWorkers,
    required DateTime date,
    required List<BookingModel> existingBookings,
    required List<SubscriptionLockModel> existingLocks,
  }) {
    final Map<String, int> availabilityMap = {};

    for (final slotStart in uiTimeSlots) {
      final parts = slotStart.split(':');
      final startM = int.parse(parts[0]) * 60 + int.parse(parts[1]);
      final endM = startM + serviceDurationMinutes;

      final endH = (endM ~/ 60).toString().padLeft(2, '0');
      final endMin = (endM % 60).toString().padLeft(2, '0');
      final slotEnd = '$endH:$endMin';

      final interval = BookingTimeInterval(start: slotStart, end: slotEnd);

      int availableWorkerCount = 0;
      for (final worker in allWorkers) {
        if (isWorkerAvailableForSlot(
          worker: worker,
          date: date,
          interval: interval,
          existingBookings: existingBookings,
          existingLocks: existingLocks,
        )) {
          availableWorkerCount++;
        }
      }

      availabilityMap[slotStart] = availableWorkerCount;
    }

    return availabilityMap;
  }

  /// Executes Atomic Worker Assignment for Single & Dual Subscriptions
  static WorkerModel? assignWorkerForSubscription({
    required SubscriptionType subscriptionType,
    required DateTime date,
    required BookingTimeInterval morningInterval,
    required BookingTimeInterval? eveningInterval,
    required LocationCoordinates customerLocation,
    required List<WorkerModel> allWorkers,
    required List<BookingModel> existingBookings,
    required List<SubscriptionLockModel> existingLocks,
  }) {
    if (subscriptionType == SubscriptionType.lunchAndDinner) {
      if (eveningInterval == null) return null;

      // Must find ONE single worker available for BOTH Morning & Evening slots
      final candidateWorkers = allWorkers.where((worker) {
        final availableMorning = isWorkerAvailableForSlot(
          worker: worker,
          date: date,
          interval: morningInterval,
          existingBookings: existingBookings,
          existingLocks: existingLocks,
        );
        final availableEvening = isWorkerAvailableForSlot(
          worker: worker,
          date: date,
          interval: eveningInterval,
          existingBookings: existingBookings,
          existingLocks: existingLocks,
        );
        return availableMorning && availableEvening;
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

      return ranked.first.worker;
    } else {
      // Single shift or Breakfast + Lunch (Same morning shift)
      final candidateWorkers = allWorkers.where((worker) {
        return isWorkerAvailableForSlot(
          worker: worker,
          date: date,
          interval: morningInterval,
          existingBookings: existingBookings,
          existingLocks: existingLocks,
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

      return ranked.first.worker;
    }
  }
}
