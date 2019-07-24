/**
 * A file appears!
 */
import { Collection } from '../collections'
import { Page } from '../page'
import { Markdown } from '../content/markdown'
import { Html } from '../content/html'

export abstract class Section {
  html: Html
  perPage: number
  pageCount: number = 0
  pinned: Markdown[] = []
  collection: Collection<Markdown>
  pages: Array<Page<Markdown>> = []

  constructor (title: string, date: Date, summary: string, image: string, perPage: number, collection: Collection<Markdown> = new Collection<Markdown>()) {
    const corpus: string = collection.content.map(item => item.body.text).join(' ')

    this.html = new Html(title, date, summary, image, corpus)
    this.perPage = perPage
    this.collection = collection
    this.pageCount = Math.ceil(collection.length / this.perPage) || 0

    collection.forEach(item => {
      if (item.isPinned) {
        this.pinned.push(item)
      }
    })

    for (let currentPage = 0; currentPage < this.pageCount; currentPage++) {
      const start: number = currentPage * this.perPage
      const end: number = ((currentPage * this.perPage) + this.perPage)
    
      this.pages.push(new Page<Markdown>(currentPage, this.collection.slice(start, end)))
    }
  }
}