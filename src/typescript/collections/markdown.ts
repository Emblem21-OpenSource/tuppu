import path from 'path'
import fs from 'fs'

import { Markdown } from '../content/markdown'

import { Collection } from '.'

export class MarkdownCollection extends Collection<Markdown> {
  constructor (sectionName: string) {
    super()
    const markdownSectionPath = path.resolve(__dirname, `../../markdown/${sectionName}`)
    const markdowns = fs.readdirSync(markdownSectionPath)
    const now = new Date()

    for (const markdown of markdowns) {
      const content = new Markdown(`${markdownSectionPath}/${markdown}`, sectionName)
      if (!content.article.isDraft && (content.article.date as Date) < now) {
        this.push(content)
      }
    }
  }
}