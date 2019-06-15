const getPagination = require('./pagination')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function getPageTemplate (pages, currentPage, articlesPerPage, section, sectionName, sectionHtml) {
  const start = currentPage * articlesPerPage
  const end = ((currentPage * articlesPerPage) + articlesPerPage)

  const currentArticles = sectionHtml.slice(start, end).join('')

  const {
    filename,
    pagination
  } = getPagination(sectionName, pages, articlesPerPage, currentPage, currentArticles)

  if (sectionName !== 'index') {
    sectionName = sectionName[0].toUpperCase() + sectionName.substr(1)
  }

  // Create plugin entry for the page
  return new HtmlWebpackPlugin({
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: false
    },
    filename,
    template: `src/theme/sections/${section}`,
    templateParameters: {
      pagination,
      articles: currentArticles,
      head: {
        title: sectionName,
        description: 'You are more than your identity',
        image: 'open_graph.jpg'
      }
    }
  })
}