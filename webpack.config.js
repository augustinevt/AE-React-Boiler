const path = require('path');
const merge = require('webpack-merge');
const parts = require('./config/webpack.parts');
const PATHS = require('./config/paths');

const commonConfig = merge([


  {
    entry: {
      app: ['babel-polyfill', 'react-hot-loader/patch', 'whatwg-fetch', PATHS.app ],
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [],
  },


// loaders

  // parts.lintJavaScript({ include: PATHS.app }),
  parts.loadJavaScript({ include: PATHS.app }),
  parts.loadStyles(),


// plugins
  parts.htmlWebpackPlugin(),
  parts.hotModuleReplacementPlugin(),
  parts.namedModulesPlugin(),

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
