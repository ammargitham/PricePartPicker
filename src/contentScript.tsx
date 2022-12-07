import { AllowedPath, allowedPathsRegexMap } from './constants';
import onSavePageLoaded from './onSavePageLoaded';

function updateThemeClasses(htmlEle: HTMLElement) {
  const classList = htmlEle.classList;
  if (classList.contains('dark-mode') && classList.contains('dark')) {
    return;
  }
  if (classList.contains('light-mode') && !classList.contains('dark')) {
    return;
  }
  if (classList.contains('dark-mode')) {
    htmlEle.classList.add('dark');
    return;
  }
  htmlEle.classList.remove('dark');
}

const classChangeObserverCallback: MutationCallback = (mutationList) => {
  mutationList.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      updateThemeClasses(mutation.target as HTMLElement);
    }
  });
};

const observer = new MutationObserver(classChangeObserverCallback);
observer.observe(document.documentElement, { attributes: true });

updateThemeClasses(document.documentElement);

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
