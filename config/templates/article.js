const HtmlWebpackPlugin = require('html-webpack-plugin')
const getKeywords = require('../../src/data/utils/metaKeywords')
const { addPath } = require('./sitemap')
const moment = require('moment')

module.exports = function getArticleTemplate (entry, relatedArticles) {
  addPath(`${entry.slug}index.html`, moment(entry.datetime).format('YYYY/MM/DD'))

  return new HtmlWebpackPlugin({
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: false
    },
    filename: `${entry.slug}index.html`,
    template: `src/theme/html/article.hbs`,
    templateParameters: {
      entry,
      showTagHeader: true,
      relatedArticles,
      head: {
        title: entry.title || 'CultState',
        summary: entry.summary || 'You are more than your identity',
        keywords: getKeywords(entry.markdown),
        image: entry.image || 'open_graph.jpg'
      }
    }
  })
}
