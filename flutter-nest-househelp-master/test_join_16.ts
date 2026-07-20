// @ts-nocheck
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { WorkersService } from './src/workers/workers.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  const workersService = app.get(WorkersService);
  const bookings = await workersService.getWorkerBookings(16);
  console.log('Bookings length:', bookings.length);
  if (bookings.length > 0) {
    const b = bookings[0];
    console.log(JSON.stringify(b, null, 2));
  }
  await app.close();
}
bootstrap();
