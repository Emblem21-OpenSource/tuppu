const HtmlWebpackPlugin = require('html-webpack-plugin')

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
        description: entry.description || 'You are more than your identity',
        image: entry.image || 'open_graph.jpg'
      }
    }
  })
}
