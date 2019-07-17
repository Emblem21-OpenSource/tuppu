/**
 * A file appears!
 */
import path from 'path'
import fs from 'fs'

import { Json } from '../content/json'

import { Section } from '.'

export class ApiSection extends Section<Json> {
  sourcePath: string

  constructor (name: string, sourcePath: string, templatePath: string, summary: string, keywords: string, image: string, datetime: Date, perPage: number = 3) {
    super(name, templatePath, summary, keywords, image, datetime, perPage)
    this.sourcePath = sourcePath
  }

  populate (): void {
    const sectionPath = path.resolve(__dirname, this.sourcePath)
    const sections = fs.readdirSync(sectionPath)
    const collection: Array<Json> = []
  
    for (const section of sections) {
      const contents: string = fs.readFileSync(section).toString()
      const entity = new Json(path.resolve(__dirname, section));
      entity.populate(contents)
      collection.push(entity)
    }
    super.populate(collection)
  }
}
