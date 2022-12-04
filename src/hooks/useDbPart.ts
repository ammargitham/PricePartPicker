import { useCallback, useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import browser from 'webextension-polyfill';

import { Event } from '@src/constants';
import { DBPart } from '@src/db';
import {
  GetDBPartResponseEvent,
  SubscribeDBPartEvent,
  UnsubscribeDBPartEvent,
} from '@src/dbHelper';
import { MessageEvent, Part } from '@src/types';

export default function useDbPart(part: Part): DBPart | undefined {
  const [dbPart, setDbPart] = useState<DBPart | undefined>();

  const listener = useCallback(
    (message: MessageEvent) => {
      if (message.event !== Event.DB_PART_RESPONSE) {
        return;
      }
      const response = message as GetDBPartResponseEvent;
      if (response.partPickerId !== part.partPickerId) {
        return;
      }
      setDbPart(response.dbPart);
    },
    [part.partPickerId],
  );

  useEffect(() => {
    const subscriptionId = nanoid();
    let dbPort = browser.runtime.connect({ name: 'db' });

    const disconnectListener = () => {
      // reconnect on disconnect (Ports get auto disconnected when idle
      // for some minutes)
      // console.log('dbPort disconnected. Reconnecting...');
      dbPort = browser.runtime.connect({ name: 'db' });
      connectAndSubscribe(dbPort);
    };

    function connectAndSubscribe(port: typeof dbPort) {
      port.onMessage.addListener(listener);
      port.postMessage(
        new SubscribeDBPartEvent(subscriptionId, part.partPickerId),
      );
      port.onDisconnect.addListener(disconnectListener);
    }

    try {
      // console.log('adding listener', part.partPickerId);
      connectAndSubscribe(dbPort);
    } catch (err) {
      console.error(err);
    }

    return () => {
      try {
        // console.log('removing listener', part.partPickerId);
        dbPort.postMessage(new UnsubscribeDBPartEvent(subscriptionId));
        dbPort.onMessage.removeListener(listener);
        dbPort.onDisconnect.removeListener(disconnectListener);
      } catch (error) {
        console.error(error);
      }
    };
  }, [listener, part.partPickerId]);

  return dbPart;
}
