const path = require('path')
const fs = require('fs')
const marked = require('./markdown')

// Module Result
const articleTypes = {
  all: [],
  pinned: ''
}

let inFrontMatter = null

const articlePath = path.resolve(__dirname, '../articles')
const articles = fs.readdirSync(articlePath)

for (const article of articles) {
  const raw = fs.readFileSync(`${articlePath}/${article}`).toString()
  const lines = raw.split('\n')
  const entry = {
    html: '',
    markdown: ''
  }

  for (const line of lines) {
    const stripped = line.trim()

    if (inFrontMatter === true) {
      if (stripped === '---') {
        inFrontMatter = false
      } else {
        // Extract FrontMatter from Markdown file
        const colonIndex = line.indexOf(':')
        entry[line.substr(0, colonIndex).trim()] = line.substr(colonIndex + 1).trim()
      }
    } else {
      if (stripped === '---' && inFrontMatter === null) {
        inFrontMatter = true
      } else {
        // Extract text
        if (stripped) {
          entry.html += marked(stripped)
        }
        entry.markdown += line
      }
    }
  }

  const date = new Date(entry.date)
  const year = date.getFullYear()
  const month = date.getMonth().toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const linkName = entry.title.replace(/\s/g, '-')
  entry.slug = `${year}/${month}/${day}/${linkName}/`

  entry.html = `
<header class="post-header">
  <section class="post">
    <h2 class="post-title">
      <a href="${entry.slug}">${entry.title}</a>
    </h2>
    <p class="post-meta">
      By <a class="post-author" href="${entry.contact}">
        ${entry.author}
      </a> on <span class="post-date">${entry.date}</span>
    </p>
    <div class="post-description">
      ${entry.html}
    </div>
  </section>
</header>`

  if (entry.pinned) {
    articleTypes.pinned = true
  }

  // Preparing final article data
  articleTypes.all.push(entry)
}

// Article filters
const pinned = articleTypes.all.find(entry => entry.pinned)

if (pinned) {
  articleTypes.pinned = `
    <div class="posts">
      <h1 class="content-subhead">Pinned Post</h1>
        ${pinned.html}
    </div>`
}

articleTypes.news = articleTypes.all
  .filter(entry => entry !== pinned)
  .slice(0, 10)
  .map(entry => entry.html)
  .join('')

module.exports = articleTypes
