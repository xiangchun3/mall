const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';
const baseConfig = require('./webpack.base.config');
const merge = require("webpack-merge");

module.exports = merge(baseConfig, {
  mode: "production",
  plugins: [
    // 打包前清理文件
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "../")
    }),
    // 将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
  output: {
    // contenthash 若文件内容无变化，则contenthash 名称不变
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    // publicPath: '/dist/' // 设置基础路径
  },
  // SplitChunksPlugin 资源拆分配置，webpack4+ 新增，webpack4以前用CommonsChunkPlugin
  optimization: {
    splitChunks: {
      chunks: 'all',
      // vendors~main.js ==> vendors-main.js
      automaticNameDelimiter: '-',
      // 使用缓存组
      cacheGroups: {
        default: false, // 禁用默认的缓存组
        vendor: {
          // 创建一个vendor代码块,它包含了整个应用中所有来自node_modules的代码.
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        },
        commons: {
          chunks: "initial",
          test: /common\/|components\//,
          name: 'common/commons',
          priority: 10,
          enforce: true
        }
      }
    },
    // 设置值为single,只会为所有生成的代码块创建一个共享的runtime文件.设置optimization.runtimeChunk=true ,将每一个入口添加一个只包含runtime的额外代码块.
    runtimeChunk: "single"
  },
  // 配置如何展示性能提示，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你。
  performance: {
    // 入口文件大小超限提示，默认值是：250000 (bytes)
    maxEntrypointSize: 800000,
    // 其它资源文件超限提示，默认值是：250000 (bytes)
    maxAssetSize: 800000
  }
})