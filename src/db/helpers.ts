import { IndexableType, liveQuery, Observer, Subscription } from 'dexie';

import { Query } from '@src/types';

import { db, DBPart } from '.';

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
): Promise<IndexableType> {
  const existing = await db.parts.get({ partPickerId });
  if (!existing) {
    return await db.parts.add({
      partPickerId,
      query,
      kakakuId,
    });
  }
  if (!existing.id) {
    throw Error('id missing!');
  }
  await db.parts.update(existing.id, {
    query,
    kakakuId,
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

// {
//   next: (result) => console.log('Got result:', JSON.stringify(result)),
//   error: (error) => console.error(error),
// }
