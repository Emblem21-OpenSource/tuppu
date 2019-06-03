const path = require('path')
const fs = require('fs')
const marked = require('./markdown')
const sectionHtml = require('./sectionHtml')

function extractArticles (directory) {
  const result = {
    all: [],
    pinned: ''
  }

  const markdownPath = path.resolve(__dirname, `../../markdown/${directory}`)
  const markdowns = fs.readdirSync(markdownPath)

  for (const markdown of markdowns) {
    let inFrontMatter = null

    const raw = fs.readFileSync(`${markdownPath}/${markdown}`).toString()
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
    entry.datetime = date
    entry.html = sectionHtml(entry)

    if (entry.pinned) {
      result.pinned = true
    }

    // Preparing final article data
    result.all.push(entry)
  }

  result.all.sort((a, b) => {
    return b.datetime - a.datetime
  })

  return result
}

module.exports = extractArticles
