import browser from 'webextension-polyfill';

import { Event } from './constants';
import { setupDbPort } from './dbHelper';
import { FetchEvent, FetchResponse, MessageEvent } from './types';

// browser.webNavigation.onCompleted.addListener(async (data) => {
//   // console.log('loaded!', data);
//   const tabs = await browser.tabs.query({
//     active: true,
//     currentWindow: true,
//   });
//   const tab = tabs[0];
//   try {
//     if (!tab || !tab.id) {
//       return;
//     }
//     await browser.tabs.sendMessage(tab.id, new UrlChangeEvent(data.url));
//   } catch (ignored) {
//     // console.error(error);
//   }
// });

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

// browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   console.log(tabId, changeInfo, tab);
//   // if (changeInfo.status === 'completed') {
//   //   console.log('Tab %d got new URL: %s', tabId, changeInfo.url);
//   // }
// });
