'use strict';
const HtmlWebpackPlugin = require('html-webpack-plugin')
let path = require('path');


module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  watch: true,

  devtool: "source-map",

  module:  {
    rules: [
      { 
        test: /\.(js)$/, 
        use: 'babel-loader' 
      },
    ],
  },
  optimization: {
    
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Food',
      template: path.resolve(__dirname, './src/index.html'), 
      filename: 'index.html', 

    })
  ],
};