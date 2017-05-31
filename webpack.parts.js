var webpack = require('webpack');
const { resolve } = require('path');


/// DEV SERVER

exports.devServer = ({host, port} = {}) => ({
  devServer: {
    //HMR
    hotOnly: true,

    historyApiFallback: true,
    stats: 'errors-only',
    host, //Defaults to  `localhost`
    port, // Default to 8080
    contentBase: resolve(__dirname, 'app'),

    overlay: {
      errors: true,
      warnings: true,
    },
  },
});


//// HMR PLUGIN

exports.hotModulePlugin = () => ({
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});

//////  LINT JAVASCRIPT

exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',

        loader: 'eslint-loader',
        options,
      },
    ],
  },
});


/// STYLE LOADER

exports.loadStyles = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,

        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});

/// JS LOADER

exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,

        loader: ['babel-loader'],
      },
    ],
  },
});
