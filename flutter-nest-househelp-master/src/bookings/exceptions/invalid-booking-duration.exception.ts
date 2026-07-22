import { BadRequestException } from '@nestjs/common';

export class InvalidBookingDurationException extends BadRequestException {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidBookingDurationException';
  }
}
