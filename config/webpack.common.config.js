const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const getContentTemplates = require('./templates/content')

global.data = require('../src/data')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'app.[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      'assets': path.resolve(__dirname, '../src/assets')
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {}
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    require('autoprefixer'),
    new CopyWebpackPlugin([{
      from: './src/assets/images',
      to: 'images'
    }]),
    new CopyWebpackPlugin([{
      from: './src/assets/icons',
      to: 'icons'
    }])
  ].concat(getContentTemplates(global.data)),
  module: {
    rules: [
      {
        test: [/.js$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: [/.css$/],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images'
            }
          }
        ]
      }, {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true
          }
        }
      }, {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      }
    ]
  }
}
