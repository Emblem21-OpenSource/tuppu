const extractArticles = require('./utils/articles')

const code = extractArticles('code')

// Create html entries
code.html = code.all
  .map(entry => entry.html)

// Create markdown entries
code.markdown = code.all
  .map(entry => entry.markdown)

module.exports = code
