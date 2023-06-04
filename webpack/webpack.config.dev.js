// eslint-disable-next-line strict
var path = require('path');
var util = require('util');
var pkg = require('../package.json');

module.exports = () => {
  return {
    mode: 'development',
    context: path.join(__dirname, '../src'),
    cache: false,
    target: 'web',
    devtool: 'source-map',
    entry: {
      index: ['./index.js', util.format('webpack-dev-server/client?http://%s:%d', pkg.config.devHost, pkg.config.devPort), 'webpack/hot/dev-server']
    },
    output: {
      path: path.resolve(pkg.config.buildDir),
      publicPath: 'http://localhost:8000/',
      pathinfo: false
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, '../src'),
          use: [{
            loader: 'react-hot-loader/webpack'
          },
          {
            loader: 'babel-loader',
            options: { babelrc: true }
          }]
        },
        {
          test: /\.html$/,
          use: ['html-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.jsx', '.js', '.json'],
      alias: { 'react-dom': '@hot-loader/react-dom' }
    },
    devServer: {
      static: path.resolve(pkg.config.sourceDir),
      compress: true,
      port: 8000,
      hot: true,
      historyApiFallback: true
    }
  };
};
