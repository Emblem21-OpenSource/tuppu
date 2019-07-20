/**
 * A file appears!
 */
import { Content } from '.'

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

export class Json extends Content {
  constructor (content: Content) {
    super(
      content.title,
      content.sourcePath,
      content.date,
      content.summary,
      content.image,
      content.isDraft,
      content.isIndex,
      content.isPinned,
      content.tags
    )

    this.body = { ...content.body }

    const frequentWords = this.frequentWords as string

    this.body.json = {
       title: this.title,
       datetime: this.datetime,
       summary: this.summary,
       image: this.image,
       isDraft: this.isDraft,
       isIndex: this.isIndex,
       isPinned: this.isPinned,
       text: this.body.text as string,
       url: this.url,
       frequentWords: frequentWords.split(', '),
       tags: this.tags
    }
  }
}
