/**
 * A file appears!
 */
import fs from 'fs'
import moment from 'moment'
import stopword from 'stopword'
import striptags from 'striptags'

import { JsonContent } from './json'

interface ContentBody {
  html: string | undefined
  markdown: string | undefined
  text: string | undefined,
  json: JsonContent | undefined
}

interface KeywordCandidate {
  word: string
  count: number
}

const badChars = /[?.!,()''{}[\]:<>/\\@#$%^&*]/g
const nonHumanChars = /[^a-zA-Z0-9_]/g
const doubleDash = /--/g
const stripRegex = /[^A-Za-z-]+/g

const ignoreWords = ['quot', 'emsp', 'http', 'https', '--', '-', 'fo', 'archive', 'not', 'means', 'com', 'will', 'when', 'one', 'png', 'jpg', 'jpeg']

export class Content {
  sourcePath: string
  sourceData: string | undefined
  title: string
  slugTitle: string
  url: string
  summary: string
  image: string
  body: ContentBody = {
    html: undefined,
    markdown: undefined,
    text: undefined,
    json: undefined
  }
  date: Date
  datetime: string
  readableDatetime: string
  shortDate: string
  isDraft: boolean
  isIndex: boolean
  isPinned: boolean
  frequentWords: string | undefined
  tags: string[] = []

  constructor(title: string, sourcePath: string, date: Date, summary: string, image: string, isDraft: boolean, isIndex: boolean, isPinned: boolean, tags: string | string[]) {
    this.sourcePath = sourcePath
    this.title = title
    this.date = date
    this.datetime = date.toISOString()
    this.readableDatetime = moment(this.datetime).format('LLLL')
    this.shortDate = moment(this.datetime).format('MM/DD/YYYY')
    this.summary = summary || 'You are more than your identity'
    this.image = image || 'open_graph.jpg'
    this.isDraft = isDraft
    this.isIndex = isIndex
    this.isPinned = isPinned

    this.slugTitle = title
      .trim()
      .replace(badChars, '')
      .replace(nonHumanChars, '-')
      .replace(doubleDash, '-')

    this.url = `${moment(this.datetime).format('YYYY/MM/DD')}/${this.slugTitle}/`

    if (typeof tags === 'string') {
      this.tags = tags.split(',').map(item => item.trim())
    } else {
      this.tags = tags.map(item => item.trim())
    }
  }

  /**
   * [loadFromFile description]
   */
  loadFromFile(): string {
    this.sourceData = fs.readFileSync(this.sourcePath).toString()

    return this.sourceData
  }

  protected populateFrequentWords(body: string) {
   this.frequentWords = this.getKeywords(body) 
  }

  protected stripAndExplodeContent (content: string): string[] {
    return striptags(content)
      .replace(stripRegex, ' ')
      .split(' ')
      .map(word => word.trim())
      .filter(word => ignoreWords.indexOf(word) === -1 && word.length > 1)
  }

  private getKeywords (content: string) {
    const candidates: KeywordCandidate[] = []
  
    stopword.removeStopwords(this.stripAndExplodeContent(content)).forEach(word => {
      const lowerWord = word.toLowerCase()
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
      .join(', ')
  }
}
