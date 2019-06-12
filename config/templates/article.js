const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function getArticleTemplate (filename) {
  return new HtmlWebpackPlugin({
    template: `src/theme/html/article.html`,
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: false
    },
    filename
  })
}
