/**
 * A file appears!
 */
import { Json } from '../content/json'
import { Collection } from '../collections'
import { Content } from '../content'

import { Section } from '.'

export class ApiSection extends Section<Json> {
  constructor (name: string, datetime: Date, perPage: number = 3) {
    super(name, datetime, perPage)
  }

  generateContent(collection: Collection<Content>): Collection<Json> {
    collection.forEach(item => {
     this.collection.push(new Json(item))
    })
    return this.collection
  }
}
