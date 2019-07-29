var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var WIZ_DIR = path.resolve(__dirname, 'src/client/wizard');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

var config = {
  entry: {
    wiz: WIZ_DIR + '/createFitProfile.jsx'
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.min.js',
    chunkFilename: "[id].chunk.js"
  },
  node: {
    fs: 'empty',
    target: 'empty'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : WIZ_DIR,
        exclude: [/node_modules/],
        loader : 'babel',
        query:
        {
          presets: ['es2015','react']
        }
      }
    ]
  },
  watch: true,
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  plugins: [
    new UglifyJSPlugin({
      minimize: true,
      compress: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};

module.exports = config;