import { IndexableType, Observer, Subscription, liveQuery } from 'dexie';

import { CustomPrice, Query } from '@src/types';

import { DBPart, db } from '.';

/**
 * Adds a db record (use from background script)
 *
 * @export
 * @param {AddPartEvent} event
 * @returns {Promise<IndexableType>}
 */
export async function addOrUpdatePart(
  partPickerId: string,
  query?: Query,
  kakakuId?: string,
  selectedKakakuShopId?: number,
  customPrice?: CustomPrice,
): Promise<IndexableType> {
  const existing = await db.parts.get({ partPickerId });
  if (!existing) {
    return await db.parts.add({
      partPickerId,
      query,
      kakakuId,
      selectedKakakuShopId,
      customPrice,
    });
  }
  if (!existing.id) {
    throw Error('id missing!');
  }
  await db.parts.update(existing.id, {
    query,
    kakakuId,
    selectedKakakuShopId,
    customPrice,
  });
  // console.log(id);
  return existing.id;
}

export function subscribeDbPartEvents(
  partPickerId: string,
  observer: Observer<DBPart | undefined>,
): Subscription {
  const partsObservable = liveQuery(() => db.parts.get({ partPickerId }));
  return partsObservable.subscribe(observer);
}
