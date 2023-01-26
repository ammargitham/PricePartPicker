/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const browsers = {
  chrome: 'chrome',
  firefox: 'firefox',
};
const manifestVersions = {
  v2: 'v2',
  v3: 'v3',
};

const extOutputDir = 'dist';

function getBrowserDistPaths() {
  const paths = {};
  Object.values(browsers).forEach((b) => {
    paths[b] = `./${extOutputDir}/${b}`;
  });
  return paths;
}

const browserDistPaths = getBrowserDistPaths();
// console.log(browserDistPaths);

function getManifestVersionPaths(base) {
  return Object.values(manifestVersions).map((v) => `${base}/${v}`);
}

function getAllOutputPaths() {
  const paths = Object.entries(browserDistPaths).flatMap(([browser, path]) => {
    if (browser === browsers.firefox) {
      return getManifestVersionPaths(path);
    }
    return [path];
  });
  // console.log(paths);
  return paths;
}

function getBrowserSrcManifestPath(browser, manifestVersion) {
  const base = `./src/manifests/${browser}`;
  return getManifestPath(base, browser, manifestVersion);
}

function getBrowserDestManifestPath(browser, manifestVersion) {
  const base = browserDistPaths[browser];
  return getManifestPath(base, browser, manifestVersion);
}

function getManifestPath(base, browser, manifestVersion) {
  let temp = base;
  if (browser === browsers.firefox) {
    temp += `/${manifestVersion}`;
  }
  return `${temp}/manifest.json`;
}

function getFileManagerPluginCopyOpts() {
  const allPaths = getAllOutputPaths();
  const opts = allPaths.flatMap((p) => {
    return [
      { source: './build/**/*', destination: p },
      { source: './src/assets/**/*', destination: p },
    ];
  });
  const manifestCopyOpts = Object.values(browsers).flatMap((b) => {
    if (b !== browsers.firefox) {
      return [
        {
          source: getBrowserSrcManifestPath(b),
          destination: getBrowserDestManifestPath(b),
        },
      ];
    }
    return Object.values(manifestVersions).map((v) => {
      return {
        source: getBrowserSrcManifestPath(b, v),
        destination: getBrowserDestManifestPath(b, v),
      };
    });
  });
  const allCopyOpts = opts.concat(manifestCopyOpts);
  // console.log(allCopyOpts);
  return allCopyOpts;
}

module.exports = {
  entry: {
    backgroundPage: path.join(__dirname, 'src/backgroundPage.ts'),
    contentScript: path.join(__dirname, 'src/contentScript.tsx'),
    // popup: path.join(__dirname, 'src/popup/index.tsx'),
  },
  output: {
    path: path.join(__dirname, 'build/js'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      // Treat src/css/app.css as a global stylesheet
      {
        test: /\app.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // Load .module.css files as CSS modules
      {
        test: /\.module.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  // Setup @src path resolution for TypeScript files
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
    },
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/[name].css',
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          delete: ['./dist'],
          copy: getFileManagerPluginCopyOpts(),
        },
      },
    }),
  ],
};
