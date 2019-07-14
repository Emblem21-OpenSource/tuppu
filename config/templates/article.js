const HtmlWebpackPlugin = require('html-webpack-plugin')
const getKeywords = require('../../src/data/utils/metaKeywords')

module.exports = function getArticleTemplate (entry, relatedArticles) {
  return new HtmlWebpackPlugin({
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: false
    },
    filename: `${entry.slug}/index.html`,
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
