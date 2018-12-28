const path = require('path');
const webpack = require('webpack');
// https://github.com/jaywcjlove/webpack-api-mocker
const apiMocker = require('webpack-api-mocker');
const baseConfig = require('./webpack.base.config');
const merge = require("webpack-merge");

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    // chunkFilename: '[name].js',
    // publicPath: '/dist/' // 设置基础路径
  },
  devServer: {
    historyApiFallback: true,// 如果为 true ，URL路径切换时，如果没有找到对应html页面，不会弹出 404 页面，留在当前页面，router为history时需要使用
    contentBase: '../dist',
    hot: true,
    // gzip压缩
    compress: true,
    // 设置host,使可用本机IP访问
    host: "0.0.0.0",
    // 端口
    port: 9000,
    // 服务启动后，默认不在浏览器中打开（不生效？）
    open: false,
    before: (app) => {
      // 拦截接口请求到本地mock文件，仅在本地服务调试时有效果，不影响上线配置
      apiMocker(app, path.resolve(__dirname, '../src/mock/index.js'));
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  // 配置如何展示性能提示，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你。
  performance: {
    hints: false
  }
})