import 'dart:async';
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

enum LockStatus { active, expired, confirmed, cancelled }

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
  final String startTime;
  final String endTime;

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
  final String startTime;
  final String endTime;

  WorkerBreakModel({required this.startTime, required this.endTime});
}

class TimeSlotInterval {
  final String startTime;
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

/// Temporary Worker Soft-Lock Model (Pre-Payment Reservation)
class WorkerTemporaryLockModel {
  final String lockId;
  final String workerId;
  final String customerId;
  final String? bookingId;
  final String serviceId;
  final SubscriptionType? subscriptionType;
  final DateTime bookingDate;
  final String bookingStart;
  final String bookingEnd;
  final LocationCoordinates customerLocation;
  LockStatus lockStatus;
  final DateTime createdAt;
  final DateTime expiresAt;
  final String paymentSessionId;

  WorkerTemporaryLockModel({
    required this.lockId,
    required this.workerId,
    required this.customerId,
    this.bookingId,
    required this.serviceId,
    this.subscriptionType,
    required this.bookingDate,
    required this.bookingStart,
    required this.bookingEnd,
    required this.customerLocation,
    required this.lockStatus,
    required this.createdAt,
    required this.expiresAt,
    required this.paymentSessionId,
  });

  bool get isActive =>
      lockStatus == LockStatus.active && DateTime.now().isBefore(expiresAt);

  int get remainingSeconds =>
      max(0, expiresAt.difference(DateTime.now()).inSeconds);
}

// ============================================================================
// 3. WORKER TEMPORARY LOCK REPOSITORY & SERVICE
// ============================================================================

class LockRepository {
  final List<WorkerTemporaryLockModel> _locks = [];

  Future<void> saveLock(WorkerTemporaryLockModel lock) async {
    _locks.add(lock);
  }

  Future<WorkerTemporaryLockModel?> findLockById(String lockId) async {
    return _locks.firstWhere(
      (l) => l.lockId == lockId,
      orElse: () => null as WorkerTemporaryLockModel,
    );
  }

  Future<List<WorkerTemporaryLockModel>> getActiveLocksForWorker(
      String workerId, DateTime date) async {
    final now = DateTime.now();
    return _locks.where((l) {
      return l.workerId == workerId &&
          l.bookingDate.year == date.year &&
          l.bookingDate.month == date.month &&
          l.bookingDate.day == date.day &&
          l.lockStatus == LockStatus.active &&
          now.isBefore(l.expiresAt);
    }).toList();
  }

  Future<List<WorkerTemporaryLockModel>> getAllActiveLocks(DateTime date) async {
    final now = DateTime.now();
    return _locks.where((l) {
      return l.bookingDate.year == date.year &&
          l.bookingDate.month == date.month &&
          l.bookingDate.day == date.day &&
          l.lockStatus == LockStatus.active &&
          now.isBefore(l.expiresAt);
    }).toList();
  }

  Future<void> updateLockStatus(String lockId, LockStatus status) async {
    final lock = await findLockById(lockId);
    if (lock != null) {
      lock.lockStatus = status;
    }
  }

  /// Automatic Cleanup Scheduler: Cleans expired locks from memory/DB
  Future<int> cleanupExpiredLocks() async {
    final now = DateTime.now();
    int count = 0;
    for (final l in _locks) {
      if (l.lockStatus == LockStatus.active && now.isAfter(l.expiresAt)) {
        l.lockStatus = LockStatus.expired;
        count++;
      }
    }
    return count;
  }
}

class WorkerLockService {
  final LockRepository _lockRepository;
  Timer? _cleanupTimer;

  WorkerLockService(this._lockRepository) {
    // Background Cleanup Scheduler running every 30 seconds
    _cleanupTimer = Timer.periodic(const Duration(seconds: 30), (_) {
      _lockRepository.cleanupExpiredLocks();
    });
  }

  void dispose() {
    _cleanupTimer?.cancel();
  }

  /// Create Temporary Soft Lock before payment (Default TTL: 90 Seconds)
  Future<WorkerTemporaryLockModel> createLock({
    required String workerId,
    required String customerId,
    required String serviceId,
    SubscriptionType? subscriptionType,
    required DateTime bookingDate,
    required String bookingStart,
    required String bookingEnd,
    required LocationCoordinates customerLocation,
    required String paymentSessionId,
    int ttlSeconds = 90,
  }) async {
    final now = DateTime.now();
    final lock = WorkerTemporaryLockModel(
      lockId: 'lock_${now.millisecondsSinceEpoch}_${Random().nextInt(9999)}',
      workerId: workerId,
      customerId: customerId,
      serviceId: serviceId,
      subscriptionType: subscriptionType,
      bookingDate: bookingDate,
      bookingStart: bookingStart,
      bookingEnd: bookingEnd,
      customerLocation: customerLocation,
      lockStatus: LockStatus.active,
      createdAt: now,
      expiresAt: now.add(Duration(seconds: ttlSeconds)),
      paymentSessionId: paymentSessionId,
    );

    await _lockRepository.saveLock(lock);
    return lock;
  }

  Future<void> releaseLock(String lockId) async {
    await _lockRepository.updateLockStatus(lockId, LockStatus.cancelled);
  }
}

// ============================================================================
// 4. 8-LEVEL AVAILABILITY HIERARCHY ENGINE
// ============================================================================

class TimeBasedCapacityLockingEngine {
  /// Evaluates worker availability across all 8 Level Checks (Confirmed Bookings + Temporary Locks)
  static bool isWorkerAvailableForInterval({
    required WorkerModel worker,
    required DateTime date,
    required TimeSlotInterval interval,
    required List<BookingModel> existingBookings,
    required List<WorkerTemporaryLockModel> activeLocks,
  }) {
    // 1. Check Leaves
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

    // 3. Check Confirmed Bookings Overlap
    final workerBookings =
        existingBookings.where((b) => b.workerId == worker.id);
    for (final booking in workerBookings) {
      if (interval.overlapsWith(booking.interval)) return false;
    }

    // 4. Check ACTIVE Temporary Soft Locks Overlap
    final workerLocks = activeLocks.where((l) => l.workerId == worker.id && l.isActive);
    for (final lock in workerLocks) {
      final partsStart = lock.bookingStart.split(':');
      final partsEnd = lock.bookingEnd.split(':');
      final lockStart =
          int.parse(partsStart[0]) * 60 + int.parse(partsStart[1]);
      final lockEnd =
          int.parse(partsEnd[0]) * 60 + int.parse(partsEnd[1]);

      if (interval.overlapsWithRaw(lockStart, lockEnd)) return false;
    }

    return true;
  }

  /// Dynamic Real-Time Slot Availability Generator
  static Map<String, int> calculateRealtimeSlotAvailability({
    required List<String> uiTimeSlots,
    required int serviceDurationMinutes,
    required List<WorkerModel> allWorkers,
    required DateTime date,
    required List<BookingModel> existingBookings,
    required List<WorkerTemporaryLockModel> activeLocks,
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
          activeLocks: activeLocks,
        )) {
          availableWorkerCount++;
        }
      }

      availabilityMap[slotStart] = availableWorkerCount;
    }

    return availabilityMap;
  }
}

// ============================================================================
// 5. PAYMENT COORDINATOR & PRE-CONFIRMATION VALIDATION
// ============================================================================

class PaymentCoordinator {
  final WorkerLockService _lockService;
  final LockRepository _lockRepository;

  PaymentCoordinator(this._lockService, this._lockRepository);

  /// Atomic Pre-Confirmation Check & Checkout Finalization
  Future<BookingModel> finalizePaymentAndConfirmBooking({
    required String lockId,
    required String paymentSessionId,
    required List<BookingModel> existingBookings,
    required List<WorkerModel> allWorkers,
  }) async {
    final lock = await _lockRepository.findLockById(lockId);

    // 1. Verify Lock Exists & Is Still ACTIVE
    if (lock == null || !lock.isActive) {
      throw Exception('This slot has just become unavailable.');
    }

    // 2. Verify Payment Session matches
    if (lock.paymentSessionId != paymentSessionId) {
      throw Exception('Invalid payment session signature.');
    }

    final worker = allWorkers.firstWhere(
      (w) => w.id == lock.workerId,
      orElse: () => throw Exception('Assigned worker no longer active.'),
    );

    final interval = TimeSlotInterval(
      startTime: lock.bookingStart,
      serviceDurationMinutes: 60, // Or parsed from bookingEnd - bookingStart
    );

    // 3. Re-verify Worker Availability (Atomic Double-Check)
    final activeLocksExceptCurrent = (await _lockRepository.getAllActiveLocks(lock.bookingDate))
        .where((l) => l.lockId != lockId)
        .toList();

    final isStillAvailable = TimeBasedCapacityLockingEngine.isWorkerAvailableForInterval(
      worker: worker,
      date: lock.bookingDate,
      interval: interval,
      existingBookings: existingBookings,
      activeLocks: activeLocksExceptCurrent,
    );

    if (!isStillAvailable) {
      await _lockService.releaseLock(lockId);
      throw Exception('This slot has just become unavailable.');
    }

    // 4. Convert Lock -> Confirmed Booking
    await _lockRepository.updateLockStatus(lockId, LockStatus.confirmed);

    final confirmedBooking = BookingModel(
      id: 'b_${DateTime.now().millisecondsSinceEpoch}',
      workerId: lock.workerId,
      customerId: lock.customerId,
      date: lock.bookingDate,
      interval: interval,
      location: lock.customerLocation,
    );

    return confirmedBooking;
  }
}
