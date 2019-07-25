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
  pinned: Markdown[] = []
  collection: Collection<Markdown>
  pages: Array<Page<Markdown>> = []

  constructor (title: string, date: Date, summary: string, image: string, perPage: number, collection: Collection<Markdown> = new Collection<Markdown>()) {
    const corpus: string = collection.content.map(item => item.article.body.text).join(' ')

    this.html = new Html(title, date, summary, image, corpus)
    this.perPage = perPage
    this.collection = collection

    collection.forEach(item => {
      if (item.article.isPinned) {
        this.pinned.push(item)
      }
    })
  }
}