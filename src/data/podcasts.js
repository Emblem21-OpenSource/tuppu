const extractArticles = require('./utils/articles')

const podcasts = extractArticles('podcasts')

// Create html entries
podcasts.html = podcasts.all
  .map(entry => entry.html)

// Create markdown entries
podcasts.markdown = podcasts.all
  .map(entry => entry.markdown)

module.exports = podcasts
