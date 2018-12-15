const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
// vue-loader 15.x后的版本，必须引入vueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// https://github.com/jaywcjlove/webpack-api-mocker
const apiMocker = require('webpack-api-mocker');

module.exports = {
  mode: 'production',
  entry: {
    app: './src/main.js',
    // vendor: ["vue"]
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].js',
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
    // before: function (app) {
    //   // 拦截接口请求到本地mock文件，仅在本地服务调试时有效果，不影响上线配置
    //   apiMocker(app, path.resolve(__dirname, './src/mock/index.js'));
    // },
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
    new cleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
      inject: true,
      title: 'index page',
      filename: 'index.html',
      template: './index.html'
    })
  ],
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
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   exclude: /node_modules/,
      //   include: [path.join(__dirname, './')]
      // },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: ['vue-style-loader', 'css-loader']
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
}