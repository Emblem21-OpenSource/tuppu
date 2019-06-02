const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * [getHtmlPages description]
 * @return {[type]} [description]
 */
function getHtmlPages () {
  const sectionPath = path.resolve(__dirname, '../src/theme/sections')
  const sections = fs.readdirSync(sectionPath)
  const result = []

  for (const section of sections) {
    result.push(new HtmlWebpackPlugin({
      template: `src/theme/sections/${section}`,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      filename: section
    }))
  }

  for (const entry of global.data.articles.all) {
    global.data.currentEntry = entry

    result.push(new HtmlWebpackPlugin({
      template: `src/theme/html/article.html`,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      filename: entry.slug
    }))
  }

  return result
}

module.exports = getHtmlPages
