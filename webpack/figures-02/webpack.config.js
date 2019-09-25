const path = require('path');

module.exports = {
  entry: './src/figures.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
