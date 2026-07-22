import { Injectable, Logger } from '@nestjs/common';
import { Booking, BookingStatus, AssignmentState } from './entities/booking.entity';
import { User } from '../users/entities/user.entity';

export interface BookingValidationResult {
  isValid: boolean;
  userLat?: number;
  userLng?: number;
  address?: string;
  reason?: string;
  failureStage?: string;
}

@Injectable()
export class BookingValidator {
  private static readonly logger = new Logger(BookingValidator.name);

  /**
   * Validates booking and user location integrity before worker assignment evaluation.
   * Caches resolved coordinates once for the entire assignment pipeline.
   */
  static validateForAssignment(
    booking: Booking,
    user: User | null,
  ): BookingValidationResult {
    // 1. Validate Booking Exists
    if (!booking) {
      return { isValid: false, reason: 'BOOKING_NULL', failureStage: 'Booking Validation' };
    }

    // 2. Validate Customer Exists
    if (!user && !booking.userId) {
      return { isValid: false, reason: 'CUSTOMER_NULL', failureStage: 'Customer Validation' };
    }

    // 3. Validate Service Exists
    if (!booking.serviceId && !booking.service) {
      return { isValid: false, reason: 'SERVICE_NULL', failureStage: 'Service Validation' };
    }

    // 4. Validate Location & Coordinates
    let userLat: number | undefined;
    let userLng: number | undefined;
    let address: string | undefined = booking.location?.address || user?.address || undefined;

    if (booking.location?.lat && booking.location?.lng) {
      userLat = parseFloat(booking.location.lat as unknown as string);
      userLng = parseFloat(booking.location.lng as unknown as string);
    } else if (booking.location?.latitude && booking.location?.longitude) {
      userLat = parseFloat(booking.location.latitude as unknown as string);
      userLng = parseFloat(booking.location.longitude as unknown as string);
    } else if (user?.preferredLat && user?.preferredLng) {
      userLat = parseFloat(user.preferredLat as unknown as string);
      userLng = parseFloat(user.preferredLng as unknown as string);
    } else if (user?.latitude && user?.longitude) {
      userLat = parseFloat(user.latitude as unknown as string);
      userLng = parseFloat(user.longitude as unknown as string);
    }

    if (!userLat || !userLng || isNaN(userLat) || isNaN(userLng)) {
      this.logger.warn(
        `Booking: ${booking.id} | Customer: ${booking.userId || user?.publicId || 'NULL'} | Address: ${address || 'NULL'} | Latitude: NULL | Longitude: NULL | Status: WAITING_FOR_LOCATION | Failure Reason: CUSTOMER_LOCATION_MISSING | Assignment aborted before worker selection.`,
      );

      return {
        isValid: false,
        reason: 'CUSTOMER_LOCATION_MISSING',
        failureStage: 'Location Validation',
        address: address || 'NULL',
      };
    }

    return {
      isValid: true,
      userLat,
      userLng,
      address,
    };
  }

  /**
   * Validates that booking duration is strictly <= 120 minutes (or matching 60 minutes for subscriptions).
   * Throws an exception if a shift duration (e.g. 6 hours) is attempted to be saved as booking endTime.
   */
  static validateDuration(startTimeStr: string, endTimeStr: string): void {
    if (!startTimeStr || !endTimeStr) return;

    const parseMinutes = (timeStr: string) => {
      const parts = timeStr.split(':');
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1] || '0', 10);
    };

    const startMins = parseMinutes(startTimeStr);
    const endMins = parseMinutes(endTimeStr);
    const durationMinutes = endMins - startMins;

    if (durationMinutes > 120) {
      const errorMsg = `Invalid booking duration (${durationMinutes} minutes: ${startTimeStr} -> ${endTimeStr}). Shift window durations cannot be saved as booking endTime. Max allowed duration is 120 minutes.`;
      this.logger.error(`❌ [PRE-SAVE GUARD ASSERTION FAILED]: ${errorMsg}`);
      throw new Error(errorMsg);
    }
  }
}
