import React from 'react';

import browser from 'webextension-polyfill';

import css from './styles.module.css';

export function Popup() {
  // Sends the `popupMounted` event
  React.useEffect(() => {
    browser.runtime.sendMessage({ popupMounted: true });
  }, []);

  // Renders the component tree
  return (
    <div className={css.popupContainer}>
      <div className="mx-4 my-4">
        <hr />
      </div>
    </div>
  );
}
