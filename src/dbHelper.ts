import { Subscription } from 'dexie';
import browser from 'webextension-polyfill';

import { Event } from './constants';
import { DBPart } from './db';
import { addOrUpdatePart, subscribeDbPartEvents } from './db/helpers';
import { KakakuItem, MessageEvent, Part, Query } from './types';

export class AddOrUpdatePartEvent extends MessageEvent {
  event: Event = Event.ADD_PART_TO_DB;
  part: Part;
  query?: Query;
  searchResult?: KakakuItem;

  constructor(part: Part, query?: Query, searchResult?: KakakuItem) {
    super();
    this.part = part;
    this.query = query;
    this.searchResult = searchResult;
  }
}

export class SubscribeDBPartEvent extends MessageEvent {
  event: Event = Event.SUBSCRIBE_DB_PART;
  subscriptionId: string;
  partPickerId: string;

  constructor(subscriptionId: string, partPickerId: string) {
    super();
    this.subscriptionId = subscriptionId;
    this.partPickerId = partPickerId;
  }
}

export class UnsubscribeDBPartEvent extends MessageEvent {
  event: Event = Event.UNSUBSCRIBE_DB_PART;
  subscriptionId: string;

  constructor(subscriptionId: string) {
    super();
    this.subscriptionId = subscriptionId;
  }
}

export class GetDBPartResponseEvent extends MessageEvent {
  event: Event = Event.DB_PART_RESPONSE;
  partPickerId: string;
  dbPart?: DBPart;

  constructor(partPickerId: string, dbPart?: DBPart) {
    super();
    this.partPickerId = partPickerId;
    this.dbPart = dbPart;
  }
}

export type Port = browser.Runtime.Port;

const partSubscriptions: Record<string, Subscription> = {};

interface AddPartProxyProps {
  part: Part;
  query?: Query;
  searchResult?: KakakuItem;
}

/**
 * Proxy to add a part to db. (To be used only from content scripts)
 *
 * @export
 * @returns
 */
export function addPartProxy({
  part,
  query,
  searchResult,
}: AddPartProxyProps): void {
  if (!query && !searchResult) {
    throw Error('query or searchResult expected');
  }
  const event = new AddOrUpdatePartEvent(part, query, searchResult);
  const dbPort = browser.runtime.connect({ name: 'db' });
  dbPort.postMessage(event);
}

/**
 * Sets up the listeners on the db port. (To be used only in background scripts)
 *
 * @export
 * @param {Port} port
 */
export function setupDbPort(port: Port): void {
  // console.log('db port connected');

  port.onMessage.addListener((msg) => {
    const event = msg as MessageEvent;
    // console.log('db port message', event);
    switch (event.event) {
      case Event.ADD_PART_TO_DB:
        const addPartEvent = msg as AddOrUpdatePartEvent;
        // console.log('add db record', event);
        addOrUpdatePart(
          addPartEvent.part.partPickerId,
          addPartEvent.query,
          addPartEvent.searchResult?.kakakuId,
        )
          .then(() => {
            // console.log(id);
          })
          .catch((e) => {
            console.error(e);
          });
        break;
      case Event.SUBSCRIBE_DB_PART: {
        const getPartEvent = msg as SubscribeDBPartEvent;
        if (partSubscriptions[getPartEvent.subscriptionId]) {
          // check if subscriptionId already exists
          return;
        }
        const subscription = subscribeDbPartEvents(getPartEvent.partPickerId, {
          next: (result) =>
            port.postMessage(
              new GetDBPartResponseEvent(getPartEvent.partPickerId, result),
            ),
          error: (error) => console.error(error),
        });
        partSubscriptions[getPartEvent.subscriptionId] = subscription;
        break;
      }
      case Event.UNSUBSCRIBE_DB_PART: {
        const unsubPartEvent = msg as UnsubscribeDBPartEvent;
        const subscription = partSubscriptions[unsubPartEvent.subscriptionId];
        if (subscription) {
          subscription.unsubscribe();
        }
        delete partSubscriptions[unsubPartEvent.subscriptionId];
        break;
      }
      default:
        break;
    }
  });
  port.onDisconnect.addListener(() => {
    // unsubscribe all subscriptions
    // console.log('bg page dbPort disconnected');
    Object.values(partSubscriptions).forEach((s) => s.unsubscribe());
  });
}
