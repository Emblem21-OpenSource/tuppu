/**
 * A file appears!
 */
import path from 'path'
import { Collection } from '../collection';
import { Page } from '../page';
import { Content } from '../content';
import { HtmlOutput } from '../htmlOutput';

export interface SectionDirectoryEntry {
  name: string;
  link: string;
  summary: string;
  date: string;
}

export abstract class Section<ContentType extends Content> {
  name: string
  templatePath: string
  baseName: string
  perPage: number
  pageCount: number = 0
  collection: Collection<ContentType> | null = null
  pages: Page<ContentType>[] = []
  directory: SectionDirectoryEntry[] = []
  html: HtmlOutput | null = null

  constructor (name: string, datetime: Date, summary: string, keywords: string, image: string, templatePath: string, perPage: number = 3, collection: Collection<ContentType>) {
    this.name = name
    this.templatePath = templatePath
    this.baseName = path.basename(this.templatePath as string, '.hbs')
    this.perPage = perPage
    this.collection = collection
    this.pageCount = Math.ceil(this.collection.length / this.perPage) || 0
    this.html = new HtmlOutput(name, datetime, summary, keywords, image)
    
    for (var currentPage = 0; currentPage < this.pageCount; currentPage++) {
      const start: number = currentPage * this.perPage
      const end: number = ((currentPage * perPage) + perPage)
    
      this.pages.push(new Page<ContentType>(currentPage, this.collection.slice(start, end)))
    }

    this.collection.forEach(item => {
      const html = item.html as HtmlOutput

      this.directory.push({
        name: item.title as string,
        link: html.slugUrl as string,
        summary: item.summary as string,
        date: item.readableDatetime as string
      })
    })
  }

  abstract populate (): void
}