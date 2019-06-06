const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const articlesPerPage = 3 // @TODO .env

/**
 * [getHtmlPages description]
 * @return {[type]} [description]
 */
function getHtmlPages (data) {
  // Get all sections
  const sectionPath = path.resolve(__dirname, '../src/theme/sections')
  const sections = fs.readdirSync(sectionPath)
  const result = []

  global.data.currentArticles = []
  global.data.currentSection = []
  global.data.pagination = []
  global.data.currentEntry = []

  for (const section of sections) {
    const sectionName = path.basename(section, '.html')

    // Calculate number of pages for the section
    let pages = 0

    if (data[sectionName]) {
      pages = Math.ceil(data[sectionName].all.length / articlesPerPage) || 0
    }

    if (pages === 0) {
      // Dealing with a static template
      result.push(new HtmlWebpackPlugin({
        template: `src/theme/sections/${section}`,
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: false
        },
        filename: `${sectionName}.html`
      }))
      continue
    }

    // Prepare markdown section name
    for (var currentPage = 0; currentPage < pages; currentPage++) {
      // Select page range for section
      const start = currentPage * articlesPerPage
      const end = ((currentPage * articlesPerPage) + articlesPerPage)

      const currentArticles = data[sectionName].html.slice(start, end).join('')

      global.data.currentArticles.push(currentArticles)

      if (sectionName !== 'index') {
        global.data.currentSection.push(sectionName[0].toUpperCase() + sectionName.substr(1))
      }

      const filename = currentPage === 0
        ? `${sectionName}.html`
        : sectionName === 'index'
          ? `page/${(currentPage + 1)}/index.html`
          : `${sectionName}/page/${(currentPage + 1)}/index.html`

      const previous = currentPage === 1
        ? `/${sectionName}.html`
        : sectionName === 'index'
          ? `/page/${(currentPage)}/index.html`
          : `/${sectionName}/page/${(currentPage)}/index.html`

      const next = sectionName === 'index'
        ? `/page/${(currentPage + 2)}/index.html`
        : `/${sectionName}/page/${(currentPage + 2)}/index.html`

      let pagination = {
        previous: `<a class="pure-button pure-button-primary" href="${previous}">Previous</a>`,
        next: `<a class="pure-button pure-button-primary" href="${next}">Next</a>`
      }

      if (currentPage === 0 && currentArticles.length >= (articlesPerPage - 1)) {
        pagination.previous = ''
      }

      if (currentPage >= (pages - 1)) {
        pagination.next = ''
      }

      global.data.pagination.push(pagination)

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
  for (const entry of data.index.all) {
    global.data.currentEntry.push(entry)

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
