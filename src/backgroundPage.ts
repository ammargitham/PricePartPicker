import browser from 'webextension-polyfill';

import { Event } from './constants';
import { setupDbPort } from './dbHelper';
import { FetchEvent, FetchResponse, MessageEvent } from './types';

browser.runtime.onMessage.addListener(async (request: MessageEvent) => {
  switch (request.event) {
    case Event.FETCH: {
      const event = request as FetchEvent;
      const response = await fetch(event.url);
      const buffer = await response.arrayBuffer();
      const decoder = new TextDecoder('shift-jis');
      const text = decoder.decode(buffer);
      const returnResponse: FetchResponse = {
        ok: response.ok,
        status: response.status,
        text,
      };
      return returnResponse;
    }
    default:
      break;
  }
});

browser.runtime.onConnect.addListener((port) => {
  if (port.name === 'db') {
    setupDbPort(port);
  }
});
