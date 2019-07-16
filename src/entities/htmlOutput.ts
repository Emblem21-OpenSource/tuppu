import moment from 'moment'
import stopword from 'stopword'
import striptags from 'striptags'

const badChars = /[?.!,()''{}[\]:<>/\\@#$%^&*]/g
const nonHumanChars = /[^a-zA-Z0-9_]/g
const doubleDash = /--/g
const stripRegex = /[^A-Za-z-]+/g

const ignoreWords = ['quot', 'emsp', 'http', 'https', '--', '-', 'fo', 'archive', 'not', 'means', 'com', 'will', 'when', 'one', 'png', 'jpg', 'jpeg']

interface KeywordCandidate {
  word: string
  count: number
}

export class HtmlOutput {
  public title: string
  public summary: string
  public keywords: string
  public image: string
  public slugName: string
  public slugUrl: string
  public body: string

  constructor(title: string, datetime: Date, summary: string, image: string, body: string) {
    this.title = title = 'CultState'
    this.summary = summary || 'You are more than your identity'
    this.image = image || 'open_graph.jpg'
    this.body = body || ''
    this.keywords = this.getKeywords(this.body)
    
    this.slugName = title
      .trim()
      .replace(badChars, '')
      .replace(nonHumanChars, '-')
      .replace(doubleDash, '-')
    
    this.slugUrl = `${moment(datetime).format('YYYY/MM/DD')}/${this.slugName}/`
  }

  /**
   * 
   * @param content 
   */
  private getKeywords (content: string) {
    const candidates: KeywordCandidate[] = []
  
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
