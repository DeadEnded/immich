import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNestedAlbumRelationship1712100663844 implements MigrationInterface {
    name = 'AddNestedAlbumRelationship1712100663844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sub_albums" ("parentId" character varying NOT NULL, "childId" character varying NOT NULL, CONSTRAINT "PK_bd5df025a7a641b10bce219dc8d" PRIMARY KEY ("parentId", "childId"))`);
        await queryRunner.query(`ALTER TABLE "sub_albums" DROP CONSTRAINT "PK_bd5df025a7a641b10bce219dc8d"`);
        await queryRunner.query(`ALTER TABLE "sub_albums" ADD CONSTRAINT "PK_6aa094f6f0d888c90c418a14d70" PRIMARY KEY ("parentId")`);
        await queryRunner.query(`ALTER TABLE "sub_albums" DROP COLUMN "childId"`);
        await queryRunner.query(`ALTER TABLE "sub_albums" ADD "childId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sub_albums" DROP CONSTRAINT "PK_6aa094f6f0d888c90c418a14d70"`);
        await queryRunner.query(`ALTER TABLE "sub_albums" ADD CONSTRAINT "PK_bd5df025a7a641b10bce219dc8d" PRIMARY KEY ("parentId", "childId")`);
        await queryRunner.query(`ALTER TABLE "sub_albums" DROP CONSTRAINT "PK_bd5df025a7a641b10bce219dc8d"`);
        await queryRunner.query(`ALTER TABLE "sub_albums" ADD CONSTRAINT "PK_b0b854d4c62ed6a4a46cff3b6b9" PRIMARY KEY ("childId")`);
        await queryRunner.query(`ALTER TABLE "sub_albums" DROP COLUMN "parentId"`);
        await queryRunner.query(`ALTER TABLE "sub_albums" ADD "parentId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sub_albums" DROP CONSTRAINT "PK_b0b854d4c62ed6a4a46cff3b6b9"`);
        await queryRunner.query(`ALTER TABLE "sub_albums" ADD CONSTRAINT "PK_bd5df025a7a641b10bce219dc8d" PRIMARY KEY ("childId", "parentId")`);
        await queryRunner.query(`CREATE INDEX "IDX_b0b854d4c62ed6a4a46cff3b6b" ON "sub_albums" ("childId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6aa094f6f0d888c90c418a14d7" ON "sub_albums" ("parentId") `);
        await queryRunner.query(`ALTER TABLE "sub_albums" ADD CONSTRAINT "FK_b0b854d4c62ed6a4a46cff3b6b9" FOREIGN KEY ("childId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sub_albums" ADD CONSTRAINT "FK_6aa094f6f0d888c90c418a14d70" FOREIGN KEY ("parentId") REFERENCES "albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_albums" DROP CONSTRAINT "FK_6aa094f6f0d888c90c418a14d70"`);
        await queryRunner.query(`ALTER TABLE "sub_albums" DROP CONSTRAINT "FK_b0b854d4c62ed6a4a46cff3b6b9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6aa094f6f0d888c90c418a14d7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b0b854d4c62ed6a4a46cff3b6b"`);
        await queryRunner.query(`ALTER TABLE "sub_albums" DROP CONSTRAINT "PK_bd5df025a7a641b10bce219dc8d"`);
        await queryRunner.query(`ALTER TABLE "sub_albums" ADD CONSTRAINT "PK_b0b854d4c62ed6a4a46cff3b6b9" PRIMARY KEY ("childId")`);
        await queryRunner.query(`ALTER TABLE "sub_albums" DROP COLUMN "parentId"`);
        await queryRunner.query(`ALTER TABLE "sub_albums" ADD "parentId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sub_albums" DROP CONSTRAINT "PK_b0b854d4c62ed6a4a46cff3b6b9"`);
        await queryRunner.query(`ALTER TABLE "sub_albums" ADD CONSTRAINT "PK_bd5df025a7a641b10bce219dc8d" PRIMARY KEY ("parentId", "childId")`);
        await queryRunner.query(`ALTER TABLE "sub_albums" DROP CONSTRAINT "PK_bd5df025a7a641b10bce219dc8d"`);
        await queryRunner.query(`ALTER TABLE "sub_albums" ADD CONSTRAINT "PK_6aa094f6f0d888c90c418a14d70" PRIMARY KEY ("parentId")`);
        await queryRunner.query(`ALTER TABLE "sub_albums" DROP COLUMN "childId"`);
        await queryRunner.query(`ALTER TABLE "sub_albums" ADD "childId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sub_albums" DROP CONSTRAINT "PK_6aa094f6f0d888c90c418a14d70"`);
        await queryRunner.query(`ALTER TABLE "sub_albums" ADD CONSTRAINT "PK_bd5df025a7a641b10bce219dc8d" PRIMARY KEY ("parentId", "childId")`);
        await queryRunner.query(`DROP TABLE "sub_albums"`);
    }

}
