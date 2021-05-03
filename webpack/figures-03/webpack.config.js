// Required libraries, for webpack to work
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/figures.js',
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
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      // HTML files
      {
        test: /\.html$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: /(node_modules)/,
        use: ['html-loader']
      },
      // Images
      {
        test: /\.(jpg|png|svg)$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'file-loader',
            options: {name: '[name].[ext]'}
          }
        ]
      },
      // JSON files
      {
        type: 'javascript/auto',
        test: /\.json$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: /(node_modules)/,
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
  devServer: {
    https: true,
  },
  devtool: 'source-map',
  plugins: [new HtmlWebpackPlugin({
    template: './src/figures.html',
    inject: 'head',
    scriptLoading: 'blocking',
    filename: 'index.html'
  })]
};
