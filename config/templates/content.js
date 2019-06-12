const {
  setBuildData
} = require('../buildData')
const getHtmlTemplate = require('./html')
const getArticleTemplate = require('./article')
const getPageTemplate = require('./page')
const getApiTemplate = require('./api')
const path = require('path')
const fs = require('fs')

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

  setBuildData('currentArticles', [])
  setBuildData('currentSection', [])
  setBuildData('pagination', [])
  setBuildData('currentEntry', [])

  for (const section of sections) {
    const sectionName = path.basename(section, '.html')

    // Calculate number of pages for the section
    let pages = 0

    if (data[sectionName]) {
      pages = Math.ceil(data[sectionName].all.length / articlesPerPage) || 0
    }

    if (pages === 0) {
      // Dealing with a static template
      result.push(getHtmlTemplate(section, sectionName))
      continue
    }

    // Prepare markdown section name
    for (var currentPage = 0; currentPage < pages; currentPage++) {
      result.push(getPageTemplate(pages, currentPage, articlesPerPage, section, sectionName, data[sectionName].html))
    }
  }

  // Generate all individual articles
  for (const entry of data.index.all) {
    setBuildData('currentEntry', entry)
    result.push(getArticleTemplate(entry.slug))
  }

  // Generate API
  for (const api of apis) {
    result.push(getApiTemplate(api))
  }

  return result
}

module.exports = getContentTemplates
