#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/7cea47a978e3a20a7ac5fbba3d8801536cd1109fdd1159af432bbf2e0c6fbafc/contract';
import endContract from '../../snapshots/7cea47a978e3a20a7ac5fbba3d8801536cd1109fdd1159af432bbf2e0c6fbafc/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/a960d10d08bdde89c8e40343e1aff2bf0a94707fd3b9e21b8385d7ff75844383/contract';
import startContract from '../../snapshots/a960d10d08bdde89c8e40343e1aff2bf0a94707fd3b9e21b8385d7ff75844383/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'room',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'room',
        index: 'room_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'room',
        foreignKey: {
          name: 'room_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
