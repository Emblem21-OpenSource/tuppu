import moment from 'moment'

const badChars = /[?.!,()''{}[\]:<>/\\@#$%^&*]/g
const nonHumanChars = /[^a-zA-Z0-9_]/g
const doubleDash = /--/g

export class Page {
  public title: string
  public summary: string
  public keywords: string
  public image: string
  public slugName: string
  public slugUrl: string

  constructor(title: string, datetime: string, summary: string, keywords: string, image: string) {
    this.title = title = 'CultState'
    this.summary = summary = 'You are more than your identity'
    this.keywords = keywords = ''
    this.image = image = 'open_graph.jpg'
    
    this.slugName = title
      .trim()
      .replace(badChars, '')
      .replace(nonHumanChars, '-')
      .replace(doubleDash, '-')
    
    this.slugUrl = `${moment(datetime).format('YYYY/MM/DD')}/${this.slugName}/`
  }
}