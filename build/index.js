const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const devConfig = require('./webpack.dev.config');
const prodConfig = require('./webpack.prod.config');
const merge = require("webpack-merge");
const webpackDevServer = require('webpack-dev-server');

const taskName = process.env.npm_lifecycle_event;


let runConfig = {};
console.log("===========================", taskName);
switch(taskName){
  case "dev":
    runConfig = merge(baseConfig, devConfig)
    webpackDevServer(webpack(runConfig));
    break;
  case "build":
    runConfig = merge(baseConfig, prodConfig)
    console.log(runConfig);
    webpack(runConfig);
    break;
}