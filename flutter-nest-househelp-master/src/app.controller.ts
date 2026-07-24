import { Controller, Get, Post, Delete, UseGuards, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthService } from './health/health.service';
import { SeedServiceAreas } from './database/seeds/seed-service-areas';
import { SeedGreaterNoidaAreas } from './database/seeds/seed-greater-noida';
import { EnhancedWorkerSeeding } from './database/seeds/enhanced-worker-seeding';
import { SeedCustomers } from './database/seeds/seed-customers';
import { SeedServiceProfiles } from './database/seeds/seed-service-profiles';
import { SeedServices } from './database/seeds/seed-services';
import { DataSource } from 'typeorm';
import { AdminGuard } from './auth/admin.guard';
import { Booking } from './bookings/entities/booking.entity';
import { Slot } from './slots/entities/slot.entity';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly healthService: HealthService,
    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}

  @Get('purge-all-bookings-now')
  @Post('purge-all-bookings-now')
  @Delete('purge-all-bookings-now')
  async purgeAllBookingsNow() {
    const logs: string[] = [];

    try {
      // 1. Delete child entities referencing booking (review, payment)
      try { await this.dataSource.query('DELETE FROM "review"'); logs.push('✅ Deleted review'); } catch (e: any) { try { await this.dataSource.query('DELETE FROM "reviews"'); logs.push('✅ Deleted reviews'); } catch (err) {} }
      try { await this.dataSource.query('DELETE FROM "payment"'); logs.push('✅ Deleted payment'); } catch (e: any) { try { await this.dataSource.query('DELETE FROM "payments"'); logs.push('✅ Deleted payments'); } catch (e: any) {} }

      // 2. Delete booking table BEFORE subscriptions (to free FK constraint FK_93d402ee62f82980aa18a014eb3)
      try {
        await this.dataSource.query('DELETE FROM "booking"');
        logs.push('✅ Deleted from "booking" table');
      } catch (e: any) {
        try {
          await this.dataSource.getRepository(Booking).clear();
          logs.push('✅ Cleared booking table via TypeORM');
        } catch (err: any) {
          logs.push(`❌ Booking clear error: ${err.message}`);
        }
      }

      // 3. Delete subscriptions (now free of booking FK references)
      try { await this.dataSource.query('DELETE FROM "subscriptions"'); logs.push('✅ Deleted subscriptions'); } catch (e: any) { try { await this.dataSource.query('DELETE FROM "subscription"'); logs.push('✅ Deleted subscription'); } catch (e: any) {} }

      // 4. Delete worker temporary locks and service requests
      try { await this.dataSource.query('DELETE FROM "worker_temporary_locks"'); logs.push('✅ Deleted worker_temporary_locks'); } catch (e: any) { try { await this.dataSource.query('DELETE FROM "worker_temporary_lock"'); logs.push('✅ Deleted worker_temporary_lock'); } catch (e: any) {} }
      try { await this.dataSource.query('DELETE FROM "service_requests"'); logs.push('✅ Deleted service_requests'); } catch (e: any) { try { await this.dataSource.query('DELETE FROM "service_request"'); logs.push('✅ Deleted service_request'); } catch (e: any) {} }

      // Reset slot availability
      try {
        await this.dataSource.getRepository(Slot).createQueryBuilder()
          .update()
          .set({ isBooked: false, currentBookings: 0 })
          .execute();
        logs.push('✅ Reset slots availability via TypeORM');
      } catch (e: any) {
        logs.push(`❌ Reset slots failed: ${e.message}`);
      }

      return {
        success: true,
        message: 'Purge operation completed on production database.',
        details: logs,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        details: logs,
      };
    }
  }

  @Get()
  getRoot() {
    return {
      status: 'ok',
      message: 'Househelp API Server is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    };
  }

  @Get('health')
  async getHealth() {
    return this.healthService.check();
  }

  @Get('db-schema-check')
  async checkDbSchema() {
    try {
      const columns = await this.dataSource.query(`
        SELECT table_name, column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        ORDER BY table_name, ordinal_position;
      `);
      return { success: true, count: columns.length, columns };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  @Get('service-duration-check')
  async checkServiceDurations() {
    try {
      const rows = await this.dataSource.query(`
        SELECT id, name, category, duration, "basePrice" 
        FROM "service" ORDER BY id;
      `);
      return { success: true, services: rows };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  @Get('subscriptions-debug')
  async debugSubscriptions() {
    try {
      const subs = await this.dataSource.query(`
        SELECT id, "userId", preferredtimewindow, status, custom_plan_data, "serviceProfileId", "monthlyPriceSnapshot"
        FROM "subscriptions" ORDER BY id DESC LIMIT 10;
      `);
      const bookings = await this.dataSource.query(`
        SELECT id, "subscriptionId", "startTime", "endTime", date, type, status, "createdAt"
        FROM "booking" WHERE type = 'subscription' ORDER BY "createdAt" DESC LIMIT 20;
      `);
      return { success: true, subscriptions: subs, recentSubscriptionBookings: bookings };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  @Post('seed')
  @UseGuards(AdminGuard)
  async runSeed() {
    const ds = this.dataSource;
    console.log('🌱 Starting database seeding...');

    const results: string[] = [];

    try {
      const seedServiceAreas = new SeedServiceAreas();
      await seedServiceAreas.run(ds);
      results.push('✅ Service areas seeded');
    } catch (e: any) { results.push(`❌ Service areas: ${e.message}`); }

    try {
      const seedGreaterNoida = new SeedGreaterNoidaAreas();
      await seedGreaterNoida.run(ds);
      results.push('✅ Greater Noida areas seeded');
    } catch (e: any) { results.push(`❌ Greater Noida: ${e.message}`); }

    try {
      const seedCustomers = new SeedCustomers();
      await seedCustomers.run(ds);
      results.push('✅ Customers seeded');
    } catch (e: any) { results.push(`❌ Customers: ${e.message}`); }

    try {
      const seedServiceProfiles = new SeedServiceProfiles();
      await seedServiceProfiles.run(ds);
      results.push('✅ Service profiles seeded');
    } catch (e: any) { results.push(`❌ Service profiles: ${e.message}`); }

    try {
      const seedServices = new SeedServices();
      await seedServices.run(ds);
      results.push('✅ Services seeded');
    } catch (e: any) { results.push(`❌ Services: ${e.message}`); }

    try {
      const enhancedWorker = new EnhancedWorkerSeeding();
      await enhancedWorker.run(ds);
      results.push('✅ Workers seeded');
    } catch (e: any) { results.push(`❌ Workers: ${e.message}`); }

    // Update special workers (ID 17 and 21) to be in Greater Noida West service area
    try {
      const updateResult = await ds.query(`
        UPDATE workers 
        SET "serviceAreaId" = '67856b26-d323-4ead-95f2-1be8fa361704',
            "serviceRadiusKm" = 25,
            latitude = 28.58,
            longitude = 77.43,
            "currentLat" = 28.58,
            "currentLng" = 77.43
        WHERE id IN (17, 21)
      `);
      results.push('✅ Worker locations updated');
    } catch (e: any) { 
      console.error('Worker location update error:', e.message);
      results.push(`❌ Worker locations: ${e.message}`); 
    }

    console.log('🌱 Seeding complete:', results);
    return { message: 'Seeding complete', results };
  }


  @Post('reset-production-database')
  @UseGuards(AdminGuard)
  async resetProductionDatabase() {
    if (process.env.NODE_ENV === 'production') {
      return {
        success: false,
        message: '❌ This endpoint is disabled in production environment'
      };
    }
    const ds = this.dataSource;
    console.log('⚠️  FULL PRODUCTION DATABASE RESET STARTED');

    await ds.query(`SET session_replication_role = replica;`);
    
    await ds.query(`TRUNCATE TABLE bookings CASCADE;`);
    await ds.query(`TRUNCATE TABLE subscriptions CASCADE;`);
    await ds.query(`TRUNCATE TABLE workers CASCADE;`);
    await ds.query(`TRUNCATE TABLE users CASCADE;`);
    await ds.query(`TRUNCATE TABLE addresses CASCADE;`);
    await ds.query(`TRUNCATE TABLE service_areas CASCADE;`);
    await ds.query(`TRUNCATE TABLE audit_logs CASCADE;`);
    await ds.query(`TRUNCATE TABLE notifications CASCADE;`);

    await ds.query(`SET session_replication_role = DEFAULT;`);

    // Recreate service areas table
    await ds.query(`
      CREATE TABLE IF NOT EXISTS service_areas (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          city VARCHAR(255),
          state VARCHAR(255),
          latitude DOUBLE PRECISION NOT NULL,
          longitude DOUBLE PRECISION NOT NULL,
          radiusKm DOUBLE PRECISION DEFAULT 25,
          isActive BOOLEAN DEFAULT true,
          createdAt TIMESTAMP DEFAULT NOW(),
          updatedAt TIMESTAMP DEFAULT NOW()
      );
    `);

    // Insert default service area
    await ds.query(`
      INSERT INTO service_areas (name, city, state, latitude, longitude)
      VALUES ('Greater Noida', 'Bisrakh Jalapur', 'Uttar Pradesh', 28.578109, 77.439027);
    `);

    console.log('✅ PRODUCTION DATABASE RESET COMPLETE');

    return {
      success: true,
      message: '✅ All customers, workers, bookings completely deleted. Database is clean. Service area created successfully.',
      timestamp: new Date().toISOString()
    };
  }

  // Quick endpoint to update worker 17 and 21 location to service area
  @Post('update-worker-locations')
  @UseGuards(AdminGuard)
  async updateWorkerLocations() {
    const ds = this.dataSource;
    try {
      const result = await ds.query(`
        UPDATE workers 
        SET "serviceAreaId" = '67856b26-d323-4ead-95f2-1be8fa361704',
            "serviceRadiusKm" = 25,
            latitude = 28.58,
            longitude = 77.43,
            "currentLat" = 28.58,
            "currentLng" = 77.43
        WHERE id IN (17, 21)
      `);
      return { message: 'Worker locations updated', result };
    } catch (e: any) {
      return { message: 'Error updating locations', error: e.message };
    }
  }

  @Get('delete-other-workers')
  async deleteOtherWorkers() {
    const ds = this.dataSource;
    const logs = [];
    try {
      // Find all workers other than worker 19 (Suvam)
      const otherWorkers = await ds.query(`SELECT id, "user_id" FROM worker WHERE id != 19`) as any[];
      const otherWorkerIds = otherWorkers.map(w => w.id);
      const otherUserIds = otherWorkers.map(w => w.user_id).filter(Boolean);

      logs.push(`Found other workers to delete: ${otherWorkerIds.join(', ')}`);
      logs.push(`Found corresponding user IDs: ${otherUserIds.join(', ')}`);

      if (otherWorkerIds.length > 0) {
        // 1. Delete from slot
        try {
          const res = await ds.query(`DELETE FROM slot WHERE "workerId" IN (${otherWorkerIds.join(',')})`);
          logs.push(`✅ Deleted slots: ${res[1] || res.rowCount || 0}`);
        } catch (e: any) {
          logs.push(`❌ Delete slots error: ${e.message}`);
        }

        // 2. Delete from worker_leaves
        try {
          const res = await ds.query(`DELETE FROM worker_leaves WHERE "worker_id" IN (${otherWorkerIds.join(',')})`);
          logs.push(`✅ Deleted worker leaves: ${res[1] || res.rowCount || 0}`);
        } catch (e: any) {
          logs.push(`❌ Delete leaves error: ${e.message}`);
        }

        // 3. Delete from service_worker
        try {
          const res = await ds.query(`DELETE FROM service_worker WHERE "worker_id" IN (${otherWorkerIds.join(',')})`);
          logs.push(`✅ Deleted service_worker mappings: ${res[1] || res.rowCount || 0}`);
        } catch (e: any) {
          logs.push(`❌ Delete service_worker error: ${e.message}`);
        }

        // 4. Update bookings to free other workers
        try {
          const res = await ds.query(`UPDATE booking SET "workerId" = NULL, "assignmentState" = 'pending' WHERE "workerId" IN (${otherWorkerIds.join(',')})`);
          logs.push(`✅ Cleared workerId from bookings: ${res[1] || res.rowCount || 0}`);
        } catch (e: any) {
          logs.push(`❌ Update bookings error: ${e.message}`);
        }

        // 5. Delete from worker table
        try {
          const res = await ds.query(`DELETE FROM worker WHERE id != 19`);
          logs.push(`✅ Deleted workers: ${res[1] || res.rowCount || 0}`);
        } catch (e: any) {
          logs.push(`❌ Delete worker error: ${e.message}`);
        }
      }

      if (otherUserIds.length > 0) {
        // 6. Delete users (role = 'worker')
        try {
          const res = await ds.query(`DELETE FROM "user" WHERE id IN (${otherUserIds.join(',')}) AND role = 'worker'`);
          logs.push(`✅ Deleted worker users: ${res[1] || res.rowCount || 0}`);
        } catch (e: any) {
          logs.push(`❌ Delete worker users error: ${e.message}`);
        }
      }

      return { success: true, logs };
    } catch (error: any) {
      return { success: false, error: error.message, stack: error.stack, logs };
    }
  }
}
