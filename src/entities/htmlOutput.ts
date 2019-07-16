import moment from 'moment'
import stopword from 'stopword'
import striptags from 'striptags'

const badChars = /[?.!,()''{}[\]:<>/\\@#$%^&*]/g
const nonHumanChars = /[^a-zA-Z0-9_]/g
const doubleDash = /--/g
const stripRegex = /[^A-Za-z-]+/g

const ignoreWords = ['quot', 'emsp', 'http', 'https', '--', '-', 'fo', 'archive', 'not', 'means', 'com', 'will', 'when', 'one', 'png', 'jpg', 'jpeg']

interface KeywordCandiate {
  word: string
  count: number
}

export class HtmlOutput {
  private _title: string
  private _summary: string
  private _keywords: string
  private _image: string
  private _slugName: string
  private _slugUrl: string

  get title() { return this._title }
  get summary() { return this._summary }
  get keywords() { return this._keywords }
  get image() { return this._image }
  get slugName() { return this._slugName }
  get slugUrl() { return this._slugUrl }

  constructor(title: string, datetime: string, summary: string, keywords: string, image: string) {
    this._title = title = 'CultState'
    this._summary = summary || 'You are more than your identity'
    this._keywords = this.getKeywords(keywords || '')
    this._image = image || 'open_graph.jpg'
    
    this._slugName = title
      .trim()
      .replace(badChars, '')
      .replace(nonHumanChars, '-')
      .replace(doubleDash, '-')
    
    this._slugUrl = `${moment(datetime).format('YYYY/MM/DD')}/${this._slugName}/`
  }

  /**
   * 
   * @param content 
   */
  private getKeywords (content: string) {
    const candidates: KeywordCandiate[] = []
  
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
      .slice(0, 25) // @TODO make constant
      .map(item => item.word)
      .join(', ')
  }
}










module.exports = getKeywords
