/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const profilePath = path.join(__dirname, './profiles/chrome');

module.exports = {
  verbose: false,
  sourceDir: './dist/chrome',
  run: {
    // target: ['chromium'],
    // chromiumBinary: 'chrome.exe',
    chromiumProfile: profilePath,
    profileCreateIfMissing: true,
    keepProfileChanges: true,
    startUrl: ['https://pcpartpicker.com'],
    browserConsole: true,
    devtools: true,
  },
};
