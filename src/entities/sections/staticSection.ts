/**
 * A file appears!
 */
import path from 'path'
import fs from 'fs'

import { Html } from '../content/html'

import { Section } from '.'

export class StaticSection extends Section<Html> {
  sourcePath: string

  constructor (name: string, sourcePath: string, templatePath: string, summary: string, keywords: string, image: string, datetime: Date, perPage: number = 3) {
    super(name, templatePath, summary, keywords, image, datetime, perPage)
    this.sourcePath = sourcePath
  }

  populate (): void {
    const sectionPath = path.resolve(__dirname, this.sourcePath)
    const sections = fs.readdirSync(sectionPath)
    const collection: Array<Html> = []
  
    for (const section of sections) {
      const entity = new Html(path.resolve(__dirname, section));
      entity.populate()
      collection.push(entity)
    }
    super.populate(collection)
  }
}
