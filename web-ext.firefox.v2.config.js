/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const profilePath = path.join(__dirname, './profiles/firefox/v2');

module.exports = {
  verbose: false,
  sourceDir: './dist/firefox/v2',
  run: {
    firefoxProfile: profilePath,
    profileCreateIfMissing: true,
    keepProfileChanges: true,
    startUrl: ['https://pcpartpicker.com'],
    // browserConsole: true,
    devtools: true,
  },
};
