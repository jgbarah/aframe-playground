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
        query: {
          presets: ['env']
        }
      },
      // HTML files
      {
        test: /\.html$/,
        include: [path.resolve(__dirname, 'src')],
        use: ['html-loader']
      },
      // JSON files
      {
        type: 'javascript/auto',
        test: /\.json$/,
        include: [path.resolve(__dirname, 'src')],
        use: [
          {
            loader: 'file-loader',
            options: {name: '[name].[ext]'}
          }
        ]
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
