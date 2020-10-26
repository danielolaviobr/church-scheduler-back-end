import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createGaleriaDates1603699869782 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "galeria_date",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "date",
            type: "varchar",
          },
          {
            name: "selected",
            type: "boolean",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("galeria_date");
  }
}
