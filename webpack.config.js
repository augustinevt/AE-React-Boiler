const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const webpack = require('webpack');


const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
  {
    entry: {
      app: ['react-hot-loader/patch', PATHS.app],
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [ new HtmlWebpackPlugin({ title: 'Webpack Demo'}),  new webpack.HotModuleReplacementPlugin(),   new webpack.NamedModulesPlugin() ],
  },
  // parts.lintJavaScript({ include: PATHS.app }),
  parts.loadJavaScript({ include: PATHS.app }),
  parts.loadStyles(),

]);

const productionConfig = merge([]);

const developmentConfig = merge([
  parts.devServer({
    // customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
]);

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }
  return merge(commonConfig, developmentConfig);
};
