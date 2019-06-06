const extractArticles = require('./utils/articles')

const books = extractArticles('books')

// Create HTML entries
books.html = books.all
  .map(entry => entry.html)

// Create markdown entries
books.markdown = books.all
  .map(entry => entry.markdown)

module.exports = books
