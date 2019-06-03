const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * [getHtmlPages description]
 * @return {[type]} [description]
 */
function getHtmlPages (data) {
  // Get all sections
  const sectionPath = path.resolve(__dirname, '../src/theme/sections')
  const sections = fs.readdirSync(sectionPath)
  const result = []

  const articlesPerPage = 3 // @TODO .env

  for (const section of sections) {
    const sectionName = path.basename(section, '.html')
    console.log('[sectionName]', sectionName)
    // Calculate number of pages for the section
    let pages = 0
    if (data[sectionName]) {
      pages = Math.ceil(data[sectionName].all.length / articlesPerPage) || 0
    }

    // Prepare section name
    global.data.currentSection = sectionName[0].toUpperCase() + sectionName.substr(1)
    console.log('[currentSection]', global.data.currentSection)
    for (var currentPage = 0; currentPage < pages; currentPage++) {
      // Select page range for section
      console.log('::', currentPage * articlesPerPage, ((currentPage * articlesPerPage) + articlesPerPage))
      global.data.currentArticles = data[sectionName].html.slice(
        currentPage * articlesPerPage,
        ((currentPage * articlesPerPage) + articlesPerPage) - 1
      )
      const filename = currentPage === 0
        ? `${sectionName}.html`
        : `${sectionName}/page/${(currentPage + 1)}/index.html`
      console.log('>>', filename)
      // Create plugin entry for the page
      result.push(new HtmlWebpackPlugin({
        template: `src/theme/sections/${section}`,
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: false
        },
        filename
      }))
    }
  }

  // Generate all individual articles
  for (const entry of data.articles.all) {
    global.data.currentEntry = entry
    console.log('>>', entry.slug)
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
