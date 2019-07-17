/**
 * A file appears!
 */
import path from 'path'
import fs from 'fs'

import { Markdown } from '../content/markdown'

import { Section } from '.'

export class ArticleSection extends Section<Markdown> {
  sourcePath: string

  constructor (name: string, sourcePath: string, templatePath: string, summary: string, keywords: string, image: string, datetime: Date, perPage: number = 3) {
    super(name, templatePath, summary, keywords, image, datetime, perPage)
    this.sourcePath = sourcePath
  }

  populate (): void {
    const sectionPath = path.resolve(__dirname, this.sourcePath)
    const sections = fs.readdirSync(sectionPath)
    const collection: Array<Markdown> = []
  
    for (const section of sections) {
      const contents: string = fs.readFileSync(section).toString()
      const entity = new Markdown(path.resolve(__dirname, section));
      entity.populate(contents)
      collection.push(entity)
    }
    super.populate(collection)
  }
}
