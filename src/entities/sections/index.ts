/**
 * A file appears!
 */
import path from 'path'

import { Collection } from '../collections'
import { Page } from '../page'
import { Content } from '../content'
import { HtmlOutput } from '../htmlOutput'

export interface SectionDirectoryEntry {
  name: string
  link: string
  summary: string
  date: string
}

export abstract class Section<ContentType extends Content> {
  name: string
  templatePath: string | undefined
  baseName: string | null = null
  perPage: number
  pageCount: number = 0
  pinned: Content[] = []
  collection: Collection<ContentType> = new Collection<ContentType>()
  pages: Array<Page<ContentType>> = []
  directory: SectionDirectoryEntry[] = []
  html: HtmlOutput | null = null

  constructor (name: string, datetime: Date, perPage: number = 3, templatePath?: string, summary?: string, keywords?: string, image?: string) {
    this.name = name
    this.templatePath = templatePath

    if (this.templatePath) {
      this.baseName = path.basename(this.templatePath as string, '.hbs')

      if (summary && keywords) {
        this.html = new HtmlOutput(datetime, name, summary, keywords, image)
      }
    }

    this.perPage = perPage
  }

  /**
   * [generateContent description]
   */
  protected abstract generateContent(collection?: Collection<Content>): Collection<Content>

  /**
   * [populate description]
   */
  protected populate (collectionOverride?: Collection<Content>): Collection<Content> {
    const collection = this.generateContent(collectionOverride)

    this.pageCount = Math.ceil(this.collection.length / this.perPage) || 0

    collection.forEach(item => {
      const html = item.html as HtmlOutput
      if (item.isPinned) {
        this.pinned.push(item)
      }

      this.directory.push({
        name: item.title as string,
        link: html.slugUrl as string,
        summary: item.summary as string,
        date: item.readableDatetime as string
      })

      this.collection.push(item as ContentType)
    })

    for (let currentPage = 0; currentPage < this.pageCount; currentPage++) {
      const start: number = currentPage * this.perPage
      const end: number = ((currentPage * this.perPage) + this.perPage)
    
      this.pages.push(new Page<ContentType>(currentPage, this.collection.slice(start, end)))
    }
    return collection
  }
}