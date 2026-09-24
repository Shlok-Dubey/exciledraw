#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/473f1f4ea9d3ba92db256412e55ca5e6d45c74caad1f9c07f6ef010c93bc0432/contract';
import endContract from '../../snapshots/473f1f4ea9d3ba92db256412e55ca5e6d45c74caad1f9c07f6ef010c93bc0432/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/774f95999e5d4157363f6a8990e676e4d2f70611d7591d1b919c32f0821701c5/contract';
import startContract from '../../snapshots/774f95999e5d4157363f6a8990e676e4d2f70611d7591d1b919c32f0821701c5/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({ schema: 'public', table: 'user', column: 'name' }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('Firstname', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-user-Firstname', {
        check: () => placeholder('backfill-user-Firstname:check'),
        run: () => placeholder('backfill-user-Firstname:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'user', column: 'Firstname' }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('password', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-user-password', {
        check: () => placeholder('backfill-user-password:check'),
        run: () => placeholder('backfill-user-password:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'user', column: 'password' }),
      this.dataTransform(endContract, 'handle-nulls-user-username', {
        check: () => placeholder('handle-nulls-user-username:check'),
        run: () => placeholder('handle-nulls-user-username:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'user', column: 'username' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
