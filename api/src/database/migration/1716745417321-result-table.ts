import { MigrationInterface, QueryRunner } from 'typeorm';

export class ResultTable1716745417321 implements MigrationInterface {
  name = 'ResultTable1716745417321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "result" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "status" "public"."result_status_enum" NOT NULL,
                "repositoryName" character varying NOT NULL,
                "findings" jsonb,
                "queuedAt" TIMESTAMP NOT NULL,
                "scanningAt" TIMESTAMP,
                "finishedAt" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_c93b145f3c2e95f6d9e21d188e2" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "result"
        `);
  }
}
