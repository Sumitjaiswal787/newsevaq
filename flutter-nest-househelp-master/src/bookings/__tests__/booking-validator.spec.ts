import { BookingValidator } from '../booking-validator';
import { InvalidBookingDurationException } from '../exceptions/invalid-booking-duration.exception';

describe('BookingValidator Unit Tests', () => {
  describe('validateDuration', () => {
    it('should pass for exact duration matching configured service (in hours)', () => {
      // 1 hour service duration, booking is 1 hour
      expect(() => {
        BookingValidator.validateDuration('05:30:00', '06:30:00', 1);
      }).not.toThrow();
    });

    it('should pass for exact duration matching configured service (in minutes)', () => {
      // 60 minutes service duration, booking is 1 hour
      expect(() => {
        BookingValidator.validateDuration('11:00:00', '12:00:00', 60);
      }).not.toThrow();
    });

    it('should pass for 2 hour service (in hours)', () => {
      expect(() => {
        BookingValidator.validateDuration('17:00:00', '19:00:00', 2);
      }).not.toThrow();
    });

    it('should throw InvalidBookingDurationException if booking duration is longer than expected', () => {
      // expected 1 hour, but got 6 hours
      expect(() => {
        BookingValidator.validateDuration('05:30:00', '11:30:00', 1);
      }).toThrow(InvalidBookingDurationException);
    });

    it('should throw InvalidBookingDurationException if booking duration is shorter than expected', () => {
      // expected 2 hours (120 min), but got 1 hour
      expect(() => {
        BookingValidator.validateDuration('11:00:00', '12:00:00', 120);
      }).toThrow(InvalidBookingDurationException);
    });
  });
});
