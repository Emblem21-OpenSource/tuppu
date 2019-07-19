/**
 * A file appears!
 */
import path from 'path'
import fs from 'fs'

import { Json } from '../content/json'

import { Section } from '.'
import { Collection } from '../collections';
import { Content } from '../content';

export class ApiSection extends Section<Json> {
  constructor (name: string, datetime: Date, perPage: number = 3) {
    super(name, datetime, perPage)
  }

  populate (collection: Collection<Content>): void {
    
    const jsonCollection = collection.asJSON()
    for (const section of sections) {
      const contents: string = fs.readFileSync(section).toString()
      const entity = new Json(path.resolve(__dirname, section));
      entity.populate(contents)
      collection.push(entity)
    }
    super.populate(collection)
  }
}
