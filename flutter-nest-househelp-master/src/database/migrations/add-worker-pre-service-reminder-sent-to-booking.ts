import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddWorkerPreServiceReminderSentToBooking1745788800000 implements MigrationInterface {
  name = 'AddWorkerPreServiceReminderSentToBooking1745788800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const columns = await queryRunner.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'booking' AND LOWER(column_name) = 'workerpreserviceremindersent'
    `);

    if (columns.length === 0) {
      await queryRunner.addColumns('booking', [
        new TableColumn({
          name: 'workerPreServiceReminderSent',
          type: 'boolean',
          default: false,
          isNullable: true,
        }),
      ]);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('booking', 'workerPreServiceReminderSent');
  }
}
