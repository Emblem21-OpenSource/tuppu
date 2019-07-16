/**
 * A file appears!
 */
import fs from 'fs'
import moment = require('moment');
import { HtmlOutput } from '../htmlOutput';

export class Content {
  public filename: string = ''
  public data: string = ''
  public title: string | null = null
  public markdown: string | null = null
  public htmlBody: string | null = null
  public datetime: Date | null = null
  public readableDatetime: string | null = null
  public shortDate: string | null = null
  public isDraft: boolean | null = null
  public isIndex: boolean | null = null
  public isPinned: boolean | null = null
  public image: string | null = null
  public html: HtmlOutput | null = null
  public tags: string[] | null = null

  constructor(filename: string) {
    this.filename = filename
  }

  public size(): number {
    return this.data.length
  }

  public load(): string {
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
    this.title = title;
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
}
