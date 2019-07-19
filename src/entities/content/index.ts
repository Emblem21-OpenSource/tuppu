/**
 * A file appears!
 */
import fs from 'fs'
import moment from 'moment'

import { HtmlOutput } from '../htmlOutput'

export interface TemplateOutput {
  title: string
  url: string
  summary: string
  image: string
  body: string
  datetime: string
  readableDatetime?: string
  shortDate?: string
  isDraft: boolean
  isIndex: boolean
  isPinned: boolean
  tags: string[]
}

export class Content {
  filename: string = ''
  data: string = ''
  title: string | null = null
  summary: string | null = null
  markdown: string | null = null
  datetime: Date | null = null
  readableDatetime: string | null = null
  shortDate: string | null = null
  isDraft: boolean | null = null
  isIndex: boolean | null = null
  isPinned: boolean | null = null
  image: string | null = null
  html: HtmlOutput | null = null
  tags: string[] | null = null

  constructor(filename: string) {
    this.filename = filename
  }

   size(): number {
    return this.data.length
  }

   load(): string {
    this.data = fs.readFileSync(this.filename).toString()
    return this.data
  }

  protected populateHtml (html: HtmlOutput) {
    this.html = html
  }

  /**
   * 
   */
  protected populateTitle(title: string): void {
    this.title = title
  }

  /**
   * [populateDate description]
   */
  protected populateDate(date: string): void {
    this.datetime = new Date(date)
    this.readableDatetime = moment(this.datetime).format('LLLL')
    this.shortDate = moment(this.datetime).format('MM/DD/YYYY')
  }

  /**
   * 
   */
  protected populateSummary(summary: string): void {
    this.summary = summary
  }

  /**
   * 
   */
  protected populateTags(tags: string) {
    return tags.split(',').map(item => item.trim())
  }

  /**
   * [populateIsDraft description]
   */
  protected populateIsDraft(isDraft: boolean = false) {
    this.isDraft = isDraft
  }

  /**
   * [populateIsIndex description]
   */
  protected populateIsIndex(isIndex: boolean = false) {
    this.isIndex = isIndex
  }

  /**
   * [populateIsPinned description]
   */
  protected populateIsPinned(isPinned: boolean = false) {
    this.isPinned = isPinned
  }

  /**
   * [populateImage description]
   */
  protected populateImage(image: string) {
    this.image = image
  }

  protected getContent (): TemplateOutput {
    const html = this.html as HtmlOutput
    const datetime = this.datetime as Date

      return {
        title: html.title as string,
        summary: html.summary as string,
        image: html.image as string,
        url: html.slugUrl as string,
        body: html.body as string,
        datetime: datetime.toISOString(),
        readableDatetime: this.readableDatetime as string,
        shortDate: this.shortDate as string,
        isDraft: this.isDraft as boolean,
        isIndex: this.isIndex as boolean,
        isPinned: this.isPinned as boolean,
        tags: this.tags as string[]
      }
    }
}
