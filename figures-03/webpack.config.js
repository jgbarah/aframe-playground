const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const fontFilesPattern = /-msdf\.(json|png)$/

module.exports = {
  entry: './src/figures.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.(jpg|png|svg)$/,
        exclude: fontFilesPattern,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: fontFilesPattern,
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
  devtool: 'source-map',
  plugins: [new HtmlWebpackPlugin({
    template: './src/figures.html',
    inject: 'head',
    filename: 'index.html'
  })]
};
