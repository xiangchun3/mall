const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'index page',
      filename: 'index.html'
    })
  ]
}