const path = require('path')
const fs = require('fs')
const marked = require('./markdown')

const articlePath = path.resolve(__dirname, '../articles')
const articles = fs.readdirSync(articlePath)

//  Extract FrontMatter

const articleTypes = {
  all: []
}

let inFrontMatter = null

for (const article of articles) {
  const raw = fs.readFileSync(`${articlePath}/${article}`).toString()
  const lines = raw.split('\n')
  const metadata = {}
  let body = ''

  for (const line of lines) {
    const stripped = line.trim()
    if (inFrontMatter === true) {
      if (stripped === '---') {
        inFrontMatter = false
      } else {
        const colonIndex = line.indexOf(':')
        metadata[line.substr(0, colonIndex).trim()] = line.substr(colonIndex + 1).trim()
      }
    } else {
      if (stripped === '---' && inFrontMatter === null) {
        inFrontMatter = true
      } else {
        const md = marked(stripped)
        body += md
      }
    }
  }

  // @TODO Add metadata to the body here
  articleTypes.all.push(body)
}

// Pre-fabricated article filters
articleTypes.news = articleTypes.all.slice(0, 10).join('')

module.exports = articleTypes
