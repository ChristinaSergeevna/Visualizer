var webpack = require('webpack');
var path = require('path');
var libraryName = 'visualizer';
var outputFile = libraryName + '.js';

var config = {
  entry: __dirname + '/src/main.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    libraryTarget: 'umd'
  }
};

module.exports = config;