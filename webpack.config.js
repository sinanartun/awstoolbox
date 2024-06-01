//@ts-check
'use strict';

const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const nodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin');

/** @type {import('webpack').Configuration} */
const config = {
  target: 'node', // vscode extensions run in a WebWorker context for VS Code web
  mode: 'development', // 
  entry: './src/extension.ts', // Entry point of the extension
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode' // vscode-module is created on-the-fly and must be excluded
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.ts', '.js'],
    // fallback: {
    //   "fs": false, // Do not include 'fs', provide a false to avoid bundling
    //   "path": require.resolve("path-browserify"), // Use 'path-browserify' fo
    //   "child_process": false, // Specify false if you want to explicitly avoid bundling for certain Node.js core modules
    //   "util": require.resolve('util'), // Provide a path to a polyfill or to the util module itself
    // }
  },
  plugins: [
    new nodePolyfillWebpackPlugin(), // This plugin polyfills Node.js core modules in Webpack
    new webpack.ProvidePlugin({
      process: 'process/browser',
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CopyPlugin({
            patterns: [
              { from: './src/images', to: 'images' },
              { from: './src/webViews/charts', to: 'webViews/charts' },
              { from: './src/webViews/css', to: 'webViews/css' },
              { from: './src/webViews/js', to: 'webViews/js' },
              { from: './src/webViews/welcome', to: 'webViews/welcome' },
              { from: './node_modules/highcharts', to: 'node_modules/highcharts' },
              { from: './node_modules/@highcharts', to: 'node_modules/@highcharts' },
              { from: './node_modules/@fortawesome/fontawesome-free', to: 'node_modules/@fortawesome/fontawesome-free' },
              { from: './node_modules/prismjs', to: 'node_modules/prismjs' },
              { from: './node_modules/datatables.net/', to: 'node_modules/datatables.net/' },
              { from: './node_modules/datatables.net-dt/', to: 'node_modules/datatables.net-dt/' },
              { from: './node_modules/datatables.net-responsive/', to: 'node_modules/datatables.net-responsive/' },
              { from: './node_modules/datatables.net-responsive-dt/', to: 'node_modules/datatables.net-responsive-dt/' },
              { from: './node_modules/jquery/', to: 'node_modules/jquery/' },
            ],
          }),
   

  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};

module.exports = config;