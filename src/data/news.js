const articles = require('./articles')
const books = require('./books')
const code = require('./code')
const podcasts = require('./podcasts')
const training = require('./training')

/**
 * [mergeTags description]
 * @param  {[type]} tags [description]
 * @return {[type]}      [description]
 */
function mergeTags (tagGroups) {
  const result = {}

  tagGroups.map(tagGroup => {
    const tags = Object.keys(tagGroup)

    tags.map(tag => {
      if (tag) {
        if (result[tag] === undefined) {
          result[tag] = []
        }
        result[tag] = result[tag].concat(tagGroup[tag])
      }
    })
  })

  return result
}

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
  tags: mergeTags([
    articles.tags,
    books.tags,
    code.tags,
    podcasts.tags,
    training.tags
  ])
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
