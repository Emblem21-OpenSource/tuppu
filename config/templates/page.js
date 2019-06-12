const {
  setBuildData
} = require('../buildData')
const getPagination = require('./pagination')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function getPageTemplate (pages, currentPage, articlesPerPage, section, sectionName, sectionHtml) {
  const start = currentPage * articlesPerPage
  const end = ((currentPage * articlesPerPage) + articlesPerPage)

  const currentArticles = sectionHtml.slice(start, end).join('')

  setBuildData('currentArticles', currentArticles)

  if (sectionName !== 'index') {
    setBuildData('currentSection', sectionName[0].toUpperCase() + sectionName.substr(1))
  }

  const {
    filename,
    pagination
  } = getPagination(sectionName, pages, articlesPerPage, currentPage, currentArticles)

  setBuildData('pagination', pagination)

  // Create plugin entry for the page
  return new HtmlWebpackPlugin({
    template: `src/theme/sections/${section}`,
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: false
    },
    filename
  })
}
