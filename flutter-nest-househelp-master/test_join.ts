import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { WorkersService } from './src/workers/workers.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const workersService = app.get(WorkersService);
  const bookings = await workersService.getWorkerBookings(1);
  console.log('Bookings array length:', bookings.length);
  if (bookings.length > 0) {
    const b = bookings[0];
    console.log('User:', b.user);
    console.log('Service:', b.service);
    console.log('Location:', b.location);
  }
  await app.close();
}
bootstrap();
