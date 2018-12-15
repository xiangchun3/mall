const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const devConfig = require('./webpack.dev.config');
const merge = require("webpack-merge");
const webpackDevServer = require('webpack-dev-server');

const taskName = process.env.npm_lifecycle_event;


let runConfig = {};

switch(taskName){
  case "dev":
    runConfig = merge(baseConfig, devConfig)
    webpackDevServer(webpack(runConfig));
    break;
  case "build":
    break;
}