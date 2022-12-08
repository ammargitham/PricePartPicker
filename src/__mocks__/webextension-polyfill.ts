/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

// src/__mocks__/webextension-polyfill
// Update this file to include any mocks for the `webextension-polyfill` package
// This is used to mock these values for Storybook so you can develop your components
// outside the Web Extension environment provided by a compatible browser
// See .storybook/main.js to see how this module is swapped in for `webextension-polyfill`

class Port {
  onMessage = {
    addListener() {},
    removeListener() {},
  };
  postMessage() {}
}

const browser: unknown = {
  // tabs: {
  //   executeScript(currentTabId: number, details: unknown) {
  //     return Promise.resolve({ done: true });
  //   },
  //   query(params: unknown): Promise<Tab[]> {
  //     return Promise.resolve([]);
  //   },
  // },
  runtime: {
    sendMessage: (params: {
      // popupMounted?: boolean;
      // contentScriptQuery?: string;
      // url?: string;
    }) => Promise,
    connect: (params: { name: string }): Port => {
      return new Port();
    },
  },
  i18n: {
    getMessage: (messageName: string) => {
      return messageName;
    },
  },
};
export default browser;

interface Tab {
  id: number;
}

export interface Tabs {
  Tab: Tab;
}
