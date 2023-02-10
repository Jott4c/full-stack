import { MigrationInterface, QueryRunner } from "typeorm";

export class createTaables1675963395057 implements MigrationInterface {
    name = 'createTaables1675963395057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "password"`);
    }

}
