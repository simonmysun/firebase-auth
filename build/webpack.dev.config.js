var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig, {
  devtool: '#eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: './dist/index.html',
      template: './src/index.html',
      hash: true,
      inject: true
    })
  ]
});
