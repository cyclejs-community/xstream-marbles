var argv = require('yargs').argv;
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var debug = require('debug')('app:config:webpack');

// Environment Constants
var NODE_ENV = process.env.NODE_ENV;
var __DEV__ = NODE_ENV === 'development';
var __PROD__ = NODE_ENV === 'production';
var __TEST__ = NODE_ENV === 'test';
var __COVERAGE__ = !argv.watch && __TEST__;
var __BASENAME__ = JSON.stringify(process.env.BASENAME || '');
var GLOBALS = {
  'process.env': { NODE_ENV: JSON.stringify(NODE_ENV) },
  NODE_ENV: NODE_ENV,
  __DEV__: __DEV__,
  __PROD__: __PROD__,
  __TEST__: __TEST__,
  __COVERAGE__: __COVERAGE__,
  __BASENAME__: __BASENAME__
};

// Constants
var ROOT = path.resolve(__dirname);
var DIST = path.join(ROOT, 'dist');
var SRC = path.join(ROOT, 'src');
var PROJECT_PUBLIC_PATH = '/';

// Base Configuration
var webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: { rules: [] }
};

// Entry
var APP_ENTRY = path.join(ROOT, 'src/app.ts');
var WEBPACK_DEV_SERVER = `webpack-dev-server/client?path=${PROJECT_PUBLIC_PATH}`
webpackConfig.entry = {
  app: __DEV__
    ? [APP_ENTRY, WEBPACK_DEV_SERVER]
    : [APP_ENTRY],
  vendor: [
    'xstream',
    '@cycle/dom',
    '@cycle/run'
  ]
};

// Output
webpackConfig.output = {
  filename: `[name].[hash].js`,
  path: DIST,
  publicPath: PROJECT_PUBLIC_PATH
};

// Plugins
webpackConfig.plugins = [
  new webpack.DefinePlugin(GLOBALS),
  new HtmlWebpackPlugin({
    template: path.join(SRC, 'index.html'),
    hash: false,
    // favicon: path.join(SRC, 'favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: { collapseWhitespace: true }
  })
];

if (__DEV__) {
  debug('Enabling plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else if (__PROD__) {
  debug('Enabling plugins for production (OccurrenceOrder & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    })
  )
}
function addRules(rules) {
  webpackConfig.module.rules = webpackConfig.module.rules.concat(rules);
}
// TypeScript and source maps
addRules([
  {
    test: /\.tsx?$/,
    loader: 'ts-loader'
  },
  {
    test: /\.js$/,
    loader: 'source-map-loader',
    enforce: 'pre',
    exclude: [
      path.join(ROOT, 'node_modules')
    ]
  }
]);

module.exports = webpackConfig;
