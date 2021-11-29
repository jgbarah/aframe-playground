// Required libraries, for webpack to work
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/data.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // JavaScript files
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      },
      // HTML files
      {
        test: /\.html$/,
        include: [path.resolve(__dirname, 'src')],
        use: ['html-loader']
      }
    ],
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/data.html',
      inject: 'head',
      filename: 'index.html'
    })
  ]
};
