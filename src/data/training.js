const extractArticles = require('./utils/articles')

const training = extractArticles('training')

// Create html entries
training.html = training.all
  .map(entry => entry.html)

// Create markdown entries
training.markdown = training.all
  .map(entry => entry.markdown)

module.exports = training
