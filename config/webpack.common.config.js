const path = require('path')
const webpack = require('webpack')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { getWebpackTemplates } = require('../src/webpack')

module.exports = {
  entry: './src/theme/index.js',
  output: {
    filename: 'app.[chunkhash].js',
    publicPath: ''
  },
  resolve: {
    alias: {
      'assets': path.resolve(__dirname, '../src/assets'),
      'root': path.resolve(__dirname, '../')
    },
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
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
    }]),
    new CopyWebpackPlugin([{
      from: `./src/robots-${process.env.NODE_ENV}.txt`,
      to: 'robots.txt'
    }])
  ].concat(getWebpackTemplates()),
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
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader'
      }
    ]
  }
}
