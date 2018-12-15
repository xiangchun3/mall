const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.[chunkHash:8].js',
    path: path.resolve(__dirname, 'dist')
  }
}