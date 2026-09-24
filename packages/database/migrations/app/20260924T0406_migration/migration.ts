#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/473f1f4ea9d3ba92db256412e55ca5e6d45c74caad1f9c07f6ef010c93bc0432/contract';
import startContract from '../../snapshots/473f1f4ea9d3ba92db256412e55ca5e6d45c74caad1f9c07f6ef010c93bc0432/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/a960d10d08bdde89c8e40343e1aff2bf0a94707fd3b9e21b8385d7ff75844383/contract';
import endContract from '../../snapshots/a960d10d08bdde89c8e40343e1aff2bf0a94707fd3b9e21b8385d7ff75844383/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({ schema: 'public', table: 'user', column: 'Firstname' }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('firstname', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-user-firstname', {
        check: () => placeholder('backfill-user-firstname:check'),
        run: () => placeholder('backfill-user-firstname:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'user', column: 'firstname' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
