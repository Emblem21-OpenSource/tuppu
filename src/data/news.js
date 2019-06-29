const articles = require('./articles')
const books = require('./books')
const code = require('./code')
const podcasts = require('./podcasts')
const training = require('./training')

const news = {
  all: articles.all.concat(
    books.all,
    code.all,
    podcasts.all,
    training.all
  ).sort((a, b) => {
    return b.datetime - a.datetime
  }),
  pinned: '',
  tags: articles.tags
}

// Article filters
const pinned = news.all.find(entry => entry.pinned)

// Create html entries
news.html = news.all
  .filter(entry => entry !== pinned && !entry.index)
  .map(entry => entry.html)

// Create markdown entries
news.markdown = news.all
  .filter(entry => entry !== pinned && !entry.index)
  .map(entry => entry.markdown)

// Removed the pinned tweet
if (pinned) {
  news.pinned = `<div class="posts">
    <h1 class="content-subhead">Pinned Post</h1>
      ${pinned.html}
  </div>`
}

module.exports = news
