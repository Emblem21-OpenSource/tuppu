const HtmlWebpackPlugin = require('html-webpack-plugin')
const { addPath } = require('./sitemap')
const moment = require('moment')

module.exports = function getStaticTemplate (section, sectionName) {
  const title = sectionName[0].toUpperCase() + sectionName.substr(1)

  addPath(`${sectionName}.html`, moment().format('YYYY/MM/DD'))

  return new HtmlWebpackPlugin({
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: false
    },
    filename: `${sectionName}.html`,
    template: `src/theme/sections/${section}`,
    templateParameters: {
      head: {
        title,
        summary: 'You are more than your identity',
        keywords: title,
        image: 'open_graph.jpg'
      }
    }
  })
}
