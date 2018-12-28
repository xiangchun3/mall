const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
// vue-loader 15.x后的版本，必须引入vueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// https://github.com/jaywcjlove/webpack-api-mocker
const apiMocker = require('webpack-api-mocker');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, './src/main.js')
  },
  output: {
    filename: devMode ? '[name].js' : '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
    // chunkFilename: '[name].js',
    // publicPath: '/dist/' // 设置基础路径
  },
  devServer: {
    historyApiFallback: true,// 如果为 true ，URL路径切换时，如果没有找到对应html页面，不会弹出 404 页面，留在当前页面，router为history时需要使用
    contentBase: './dist',
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
      apiMocker(app, path.resolve(__dirname, './src/mock/index.js'));
    }
  },
  resolve: {
    // 配置以下文件类型，可省略后缀
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue: 'vue/dist/vue.js',
      '@': path.resolve("./")
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    // 将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new cleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
      inject: true,
      title: 'index page',
      filename: 'index.html',
      template: './index.html'
    })
  ],
  // SplitChunksPlugin 资源拆分配置，webpack4+ 新增，webpack4以前用CommonsChunkPlugin
  optimization: {
    splitChunks: {
      /*
        chunks: 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
        minSize: 表示在压缩前的最小模块大小，默认为0；
        minChunks: 表示被引用次数，默认为1；
        maxAsyncRequests: 最大的按需(异步)加载次数，默认为1；
        maxInitialRequests: 最大的初始化加载次数，默认为1；
        name: 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
        cacheGroups: 缓存组。
        如果不在缓存组中重新赋值，缓存组默认继承上面的选项
      */
      chunks: 'all',
      // vendors~main.js ==> vendors-main.js
      automaticNameDelimiter: '-',
      // 使用缓存组
      cacheGroups: {
        default: false, // 禁用默认的缓存组
        vendor: { // split `node_modules`目录下被打包的代码到 `common/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
          // chunks: "initial",
          // test: /node_modules\//,
          // name: 'common/vendors',
          // priority: 10, // 缓存组优先级？
          // enforce: true
          // 创建一个vendor代码块,它包含了整个应用中所有来自node_modules的代码.
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        },
        commons: { // split `common`和`components`目录下被打包的代码到`common/commons.js && .css`
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
  // 入口资源文件超过 250kb不显示警告
  // performance: {
  //   hints: false
  // },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      // {
      //   test: /\.m?js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       "babelrc": false,// 不采用.babelrc的配置
      //       "plugins": [
      //           "dynamic-import-webpack"
      //       ],
      //       presets: ['@babel/preset-env']
      //     }
      //   }
      // },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        // use: ['vue-style-loader', 'css-loader']
        // 将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件
        use: [
          MiniCssExtractPlugin.loader,
          // "vue-style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 10KB以下的的图片转成BASE64格式
              limit: 1024 * 10
            }
          }
        ]
      },
      // {
      //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      //     use: [{
      //         loader: "url-loader",
      //         options: {
      //             limit: 1024 * 5,
      //             name: 'fonts/[name].[hash:7].[ext]'
      //         }
      //     }]
      // }
    ]
  },
  // 配置如何展示性能提示，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你。
  performance: {
    // 入口文件大小超限提示，默认值是：250000 (bytes)
    maxEntrypointSize: 800000,
    // 其它资源文件超限提示，默认值是：250000 (bytes)
    maxAssetSize: 800000
  }
}