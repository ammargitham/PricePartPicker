import Dexie, { Table } from 'dexie';

import { CustomPrice, Query } from '@src/types';

export interface DBPart {
  id?: number;
  partPickerId: string;
  query?: Query;
  kakakuId?: string;
  selectedKakakuShopId?: number;
  customPrice?: CustomPrice;
}

export class Database extends Dexie {
  parts!: Table<DBPart>;

  constructor() {
    super('app');
    this.version(1).stores({
      parts: '++id, &partPickerId, query, kakakuId',
    });
  }
}

export const db = new Database();
