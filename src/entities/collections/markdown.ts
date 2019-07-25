import path from 'path'
import fs from 'fs'

import { Markdown } from '../content/markdown'

import { Collection } from '.'

export class MarkdownCollection extends Collection<Markdown> {
  constructor (sectionName: string) {
    super()
    const markdownSectionPath = path.resolve(__dirname, '../../markdown/${sectionName}')
    const markdowns = fs.readdirSync(markdownSectionPath)
    for (const markdown of markdowns) {
      this.push(new Markdown(`${markdownSectionPath}/${markdown}`, sectionName))
    }

    this.internalSort((a, b) => {
      return (b.article.date as Date).getTime() - (a.article.date as Date).getTime()
    })
  }
}