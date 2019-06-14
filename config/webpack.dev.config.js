const path = require('path')
const merge = require('webpack-merge')

const webpackBaseConfig = require('./webpack.common.config.js')

module.exports = merge(webpackBaseConfig, {
  output: {
    filename: 'app.[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  }
})
