import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class users1623260011724 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4 ()',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'VARCHAR',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'VARCHAR',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'VARCHAR',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
