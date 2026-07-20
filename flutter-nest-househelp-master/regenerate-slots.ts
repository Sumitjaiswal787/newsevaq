import { DataSource } from 'typeorm';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { DailySlotGenerationScheduler } from './src/slots/daily-slot-generation.scheduler';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  
  console.log('Deleting unbooked future slots...');
  const result = await dataSource.query('DELETE FROM "slot" WHERE "isBooked" = false AND "startTime" > NOW()');
  console.log('Deleted slots:', result[1]);

  console.log('Triggering slot generation...');
  const scheduler = app.get(DailySlotGenerationScheduler);
  await scheduler.triggerSlotGeneration(45);
  console.log('Slot generation complete.');
  
  await app.close();
  process.exit(0);
}
bootstrap();
