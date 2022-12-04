// import browser from 'webextension-polyfill';
import { AllowedPath, allowedPathsRegexMap } from './constants';
import onSavePageLoaded from './onSavePageLoaded';

// const fetchPort = browser.runtime.connect({ name: 'fetch' });
// fetchPort.postMessage({
//   url: 'https://kakaku.com/search_results/3060ti/?category=0001_0028&sort=priceb',
// });
// fetchPort.onMessage.addListener((msg) => {
//   console.log(msg);
// });

// browser.runtime.onMessage.addListener((request: MessageEvent) => {
// switch (request.event) {
//   case Event.URL_CHANGE:
//     const event = request as UrlChangeEvent;
//     onUrlChange(event.url);
//     break;
//   default:
//     break;
// }
// });

// window.addEventListener('hashchange', (e) => {
//   currentUrl = e.newURL;
//   // console.log(currentUrl);
//   onUrlChange();
// });

function matchPage(pathname: string) {
  for (const [path, regex] of Object.entries(allowedPathsRegexMap)) {
    if (regex.exec(pathname)) {
      return path as AllowedPath;
    }
  }
  return null;
}

function onUrlChange(url: string) {
  const parsedUrl = new URL(url);
  const pathname = parsedUrl.pathname;
  // const hash = parsedUrl.hash;
  // console.log(pathname, hash);
  const page = matchPage(pathname);
  if (!page) {
    return;
  }
  // console.log('on page', page);
  onPageChange(
    page,
    // {
    //   hash,
    // }
  );
}

function onPageChange(
  page: AllowedPath,
  // extras: {
  //   hash?: string;
  // },
) {
  switch (page) {
    case 'saved':
      onSavePageLoaded();
      break;
    case 'other':
      break;
  }
}

function onLoad() {
  const currentUrl = window.location.href;
  onUrlChange(currentUrl);
}

window.addEventListener('load', onLoad);
