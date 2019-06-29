const path = require('path')
const fs = require('fs')
const marked = require('./markdown')
const sectionHtml = require('./sectionHtml')
const moment = require('moment')

moment.locale('en')

function extractArticles (directory) {
  const result = {
    all: [],
    tags: {},
    pinned: ''
  }

  let indexEntry

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

    let index = 0
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
          const remainingText = lines.slice(index).join('\n')
          entry.html = marked(remainingText)
          entry.markdown = remainingText
          break
        }
      }
      index += 1
    }

    if (entry.draft) {
      continue
    }

    const date = new Date(entry.date)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const linkName = entry.title
      .trim()
      .replace(/[?.!,()'"{}[\]:<>/\\@#$%^&*]/g, '')
      .replace(/[^a-zA-Z0-9_]/g, '-')
      .replace(/--/g, '-')

    entry.slug = `${year}/${month}/${day}/${linkName}/`
    entry.datetime = date
    entry.readableDatetime = moment(entry.datetime).format('LLLL')
    entry.shortDate = moment(entry.datetime).format('MM/DD/YYYY')
    entry.html = sectionHtml(entry)
    entry.summary = entry.summary || 'TBD'

    entry.tags = (entry.tags || '').split(',').map(item => {
      // Add articles to the tag category
      const tag = item.trim()
      if (result.tags[tag] === undefined) {
        result.tags[tag] = []
      }
      result.tags[tag].push(entry)
      return tag
    })

    if (entry.pinned) {
      result.pinned = true
    }

    // Preparing final article data
    if (entry.index) {
      indexEntry = entry
    } else {
      result.all.push(entry)
    }
  }

  result.all.sort((a, b) => {
    return b.datetime - a.datetime
  })

  if (indexEntry) {
    // Add index to the beginning if it exists
    result.all.unshift(indexEntry)
  }

  return result
}

module.exports = extractArticles
