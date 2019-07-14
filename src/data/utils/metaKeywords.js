const stopword = require('stopword')
const striptags = require('striptags')

const stripRegex = /[^A-Za-z-]+/g

const ignoreWords = ['quot', 'emsp', 'http', 'https', '--', '-', 'fo', 'archive', 'not', 'means', 'com', 'will', 'when', 'one', 'png', 'jpg', 'jpeg']

function getKeywords (content) {
  const candidates = []

  stopword.removeStopwords(
    striptags(content)
      .replace(stripRegex, ' ')
      .split(' ')
      .map(word => word.trim())
      .filter(word => ignoreWords.indexOf(word) === -1 && word.length > 1)
  ).forEach(word => {
    word = word.toLowerCase()
    let candidate = candidates.find(item => item.word === word)

    if (!candidate) {
      candidate = {
        word,
        count: 0
      }
      candidates.push(candidate)
    }

    candidate.count += 1
  })

  return candidates
    .sort((a, b) => b.count - a.count)
    .slice(0, 25)
    .map(item => item.word)
    .join(', ')
}

module.exports = getKeywords
