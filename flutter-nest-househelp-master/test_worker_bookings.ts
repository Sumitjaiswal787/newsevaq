import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { WorkersService } from './src/workers/workers.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const workersService = app.get(WorkersService);
  const bookings = await workersService.getWorkerBookings(1);
  console.log(JSON.stringify(bookings[0], null, 2));
  await app.close();
}
bootstrap();
