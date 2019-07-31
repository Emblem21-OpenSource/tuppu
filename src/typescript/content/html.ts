import moment from 'moment'
import stopword from 'stopword'
import striptags from 'striptags'

import { getHost } from '../config'

interface KeywordCandidate {
  word: string
  count: number
}

const badChars = /[?.!,()''{}[\]:<>/\\@#$%^&*]/g
const nonHumanChars = /[^a-zA-Z0-9_]/g
const doubleDash = /--/g
const stripRegex = /[^A-Za-z-]+/g

const ignoreWords = ['quot', 'emsp', 'http', 'https', '--', '-', 'fo', 'its', 'mr', 've', 're', 'didn', 'so', 'ed', 'th', 'archive', 'mar', 'dec', 'not', 'means', 'com', 'will', 'when', 'one', 'png', 'jpg', 'jpeg']

export interface HtmlParameters {
  host: string
  title: string
  slugTitle: string
  datetime: string
  readableDatetime: string
  shortDate: string
  summary: string
  image: string
  url: string
  keywords: string
}

export class Html {
  static getSlugTitle(title: string) {
    return title
      .trim()
      .replace(badChars, '')
      .replace(nonHumanChars, '-')
      .replace(doubleDash, '-')
  }

  host: string
  title: string
  slugTitle: string
  datetime: string
  readableDatetime: string
  shortDate: string
  summary: string
  image: string
  url: string
  keywords: string

  constructor(title: string, date: Date, summary: string, image: string, text: string) {
    this.host = getHost()
    this.title = title
    this.datetime = date.toISOString()
    this.readableDatetime = moment(this.datetime).format('LLLL')
    this.shortDate = moment(this.datetime).format('MM/DD/YYYY')
    this.summary = summary || 'You are more than your identity'
    this.image = image || 'open_graph.jpg'

    this.slugTitle = Html.getSlugTitle(title)

    this.url = `${moment(this.datetime).format('YYYY/MM/DD')}/${this.slugTitle}/`
    this.keywords = this.getKeywords(text).join(', ')
  }

  getParameters (): HtmlParameters {
    return {
      host: getHost(),
      title: this.title,
      slugTitle: this.slugTitle,
      datetime: this.datetime,
      readableDatetime: this.readableDatetime,
      shortDate: this.shortDate,
      summary: this.summary,
      image: this.image,
      url: this.url,
      keywords: this.keywords,
    }
  }

  private getKeywords (content: string): string[] {
    const candidates: KeywordCandidate[] = []

    const strippedContent = striptags(content)
      .replace(stripRegex, ' ')
      .split(' ')
      .map(word => word.trim())
      .filter(word => ignoreWords.indexOf(word) === -1 && word.length > 1)

    stopword.removeStopwords(strippedContent).forEach(word => {
      const lowerWord = word.trim().toLowerCase()
      let candidate = candidates.find(item => item.word === lowerWord)
  
      if (!candidate) {
        candidate = {
          word: lowerWord,
          count: 0
        }
        candidates.push(candidate)
      }
  
      candidate.count += 1
    })

    return candidates
      .sort((a, b) => b.count - a.count)
      .slice(0, 25) // @TODO make constant
      .map(item => item.word)
  }
}