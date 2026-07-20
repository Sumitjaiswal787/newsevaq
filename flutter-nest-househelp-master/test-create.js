const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/app.module');
const { BookingsService } = require('./dist/bookings/bookings.service');
const { getRepositoryToken } = require('@nestjs/typeorm');
const { Booking } = require('./dist/bookings/entities/booking.entity');

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const bookingsRepository = app.get(getRepositoryToken(Booking));

  const bookingData = {
    userId: '123e4567-e89b-12d3-a456-426614174000',
    serviceId: 1,
    date: '2026-07-18',
    startTime: '10:00:00',
    endTime: '11:00:00',
    otp: '1234',
    isOtpVerified: false
  };

  const booking = bookingsRepository.create(bookingData);
  console.log('Created entity instance:', booking);

  await app.close();
}

bootstrap().catch(console.error);
