import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createMaxCapacity1603910155088 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "max_capacity",
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
            name: "event",
            type: "varchar",
          },
          {
            name: "max_capacity",
            type: "numeric",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("max_capacity");
  }
}
