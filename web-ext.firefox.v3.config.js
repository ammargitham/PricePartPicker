/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const profilePath = path.join(__dirname, './profiles/firefox/v3');

module.exports = {
  verbose: false,
  sourceDir: './dist/firefox/v3',
  run: {
    firefoxPreview: ['mv3'],
    firefoxProfile: profilePath,
    profileCreateIfMissing: true,
    keepProfileChanges: true,
    startUrl: ['https://pcpartpicker.com'],
    // browserConsole: true,
    devtools: true,
  },
};
