import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailToUser1777044715281 implements MigrationInterface {
  name = 'AddEmailToUser1777044715281';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
  }
}
