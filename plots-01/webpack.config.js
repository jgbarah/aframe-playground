// Required libraries, for webpack to work
// including this configuration file
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Pattern for catching MSDF font files
const fontFilesPattern = /-msdf\.(json|png)$/

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      // JavaScript files
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      // HTML files
      {
        test: /\.html$/,
        include: [path.resolve(__dirname, 'src')],
        loader: "html-loader"
      },
      // Images (exclude MSDF fonts, since some are PNG)
      {
        test: /\.(jpg|png|svg)$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: fontFilesPattern,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      // MSDF fonts
      {
        test: fontFilesPattern,
        include: [path.resolve(__dirname, 'src')],
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      // JSON files
      {
        test: /\.json$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: fontFilesPattern,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
    ],
  },
  stats: {
    colors: true
  },
  // Produce a source map for debugging
  devtool: 'source-map',
  // Produce a driver index.html file, based on figures.html
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: 'head',
    filename: 'index.html'
  })]
};
