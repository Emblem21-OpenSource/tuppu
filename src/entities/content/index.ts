/**
 * A file appears!
 */
import striptags from 'striptags'

import { Html } from './html'

export interface JsonContent {
  title: string
  datetime: string
  summary: string
  image: string
  isDraft: boolean
  isIndex: boolean
  isPinned: boolean
  text: string
  url: string
  frequentWords: string[]
  tags: string[]
}

export interface ContentBody {
  html: string
  markdown: string | undefined
  text: string | undefined,
  json?: JsonContent
}

export class Content {
  sourcePath: string
  sourceData: string | undefined
  html: Html
  body: ContentBody
  isDraft: boolean
  isIndex: boolean
  isPinned: boolean
  frequentWords: string[]
  tags: string[] = []

  constructor(title: string, sourcePath: string, date: Date, summary: string, image: string, isDraft: boolean, isIndex: boolean, isPinned: boolean, tags: string | string[], body: ContentBody) {
    this.sourcePath = sourcePath
    this.isDraft = isDraft
    this.isIndex = isIndex
    this.isPinned = isPinned

    if (typeof tags === 'string') {
      this.tags = tags.split(',').map(item => item.trim())
    } else {
      this.tags = tags.map(item => item.trim())
    }

    this.body = body

    this.html = new Html(title, date, summary, image, this.body.text as string)
    this.frequentWords = this.html.keywords.split(', ')

    this.body.json = {
      title: this.html.summary,
      datetime: this.html.datetime,
      summary: this.html.summary,
      image: this.html.image,
      isDraft: this.isDraft,
      isIndex: this.isIndex,
      isPinned: this.isPinned,
      text: striptags(this.body.html as string),
      url: this.html.url,
      frequentWords: this.frequentWords,
      tags: this.tags
    }
  }

  /**
   * [asJSON description]
   */
  asJSON() {
    return this.body.json
  }
}
