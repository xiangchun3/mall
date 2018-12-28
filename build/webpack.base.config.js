const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
// vue-loader 15.x后的版本，必须引入vueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/main.js')
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js',
      '@': path.resolve("../src")
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({
      inject: true,
      title: 'index page',
      filename: 'index.html',
      template: './index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: ["vue-style-loader", "css-loader"]
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
              limit: 1024 * 10,
              // img相对dist
              outputPath: "images",
              // publicPath: path.resolve(__dirname, "../dist/images")
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
  }
}