var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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

exports.hotModuleReplacementPlugin = () => ({
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});

/// HtmlWebpackPlugin

exports.htmlWebpackPlugin = () => ({
  plugins: [
    new HtmlWebpackPlugin({ title: 'Webpack Demo'}),
  ],
});

/// NamedModulesPlugin

exports.namedModulesPlugin = () => ({
  plugins: [
    new webpack.NamedModulesPlugin(),
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
        test: /\.scss$/,
        include,
        exclude,
        use: [{
          loader: 'style-loader',
        },{
          loader: 'css-loader', options: {
            sourceMap: true,
          },
        },{
          loader: 'resolve-url-loader',
        },{
          loader: 'sass-loader', options: {
            sourceMap: true,
          },
        }],
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
