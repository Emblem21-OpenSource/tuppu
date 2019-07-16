const getStaticTemplate = require('./static')
const getArticleTemplate = require('./article')
const getPageTemplate = require('./page')
const getApiTemplate = require('./api')
const path = require('path')
const fs = require('fs')
const { getPlugin } = require('./sitemap')

const articlesPerPage = 3 // @TODO .env

/**
 * [getHtmlPages description]
 * @return {[type]} [description]
 */
function getContentTemplates (data) {
  // Get all sections
  const sectionPath = path.resolve(__dirname, '../../src/theme/sections')
  const apiPath = path.resolve(__dirname, '../../src/api')
  const sections = fs.readdirSync(sectionPath)
  const apis = fs.readdirSync(apiPath)
  const result = []

  for (const section of sections) {
    const sectionName = path.basename(section, '.hbs')

    // Calculate number of pages for the section
    let pages = 0

    if (data[sectionName]) {
      pages = Math.ceil(data[sectionName].all.length / articlesPerPage) || 0
    }

    if (pages === 0) {
      // Dealing with a static template
      result.push(getStaticTemplate(section, sectionName))
      continue
    }

    const articleDirectory = data[sectionName].all.filter(item => !item.index)

    // Prepare markdown section name
    for (var currentPage = 0; currentPage < pages; currentPage++) {
      result.push(getPageTemplate(pages, articleDirectory, currentPage, articlesPerPage, section, sectionName, data[sectionName].html))
    }
  }

  const allTags = Object.keys(data.index.tags)

  // Generate all individual articles
  for (const entry of data.index.all) {
    let relatedArticles = []

    allTags.map(category => {
      if (entry.tags.indexOf(category) > -1) {
        relatedArticles = relatedArticles.concat(data.index.tags[category])
      }
    })

    result.push(getArticleTemplate(entry, [
      ...new Set(relatedArticles
        .filter(item => item.slug !== entry.slug)
        .sort((a, b) => b.datetime - a.datetime))
    ]))
  }

  // Generate API
  for (const api of apis) {
    result.push(getApiTemplate(api))
  }

  result.push(getPlugin())

  return result
}

module.exports = getContentTemplates
