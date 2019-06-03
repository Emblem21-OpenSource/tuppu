const extractArticles = require('./utils/articles')

const articles = extractArticles('articles')

// Create html entries
articles.html = articles.all
  .map(entry => entry.html)

// Create markdown entries
articles.markdown = articles.all
  .map(entry => entry.markdown)

module.exports = articles