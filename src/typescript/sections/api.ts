/**
 * A file appears!
 */
import WriteJsonPlugin from 'write-json-webpack-plugin'

import { Html } from '../content/html'
import { Json } from '../content/json'
import { addSitemapPath } from '../content/sitemap'

import { Section } from '.'

interface ApiSettings {
  object: Json
  path: 'api'
  filename: string
  pretty: true
}

export class ApiSection extends Section {
  json: Json
  constructor (json: Json, perPage: number) {
    super(
      json.title,
      new Date(json.datetime),
      json.summary,
      json.image,
      perPage
    )
    this.json = json
  }

  getWebpackPlugin(filename?: string): any {
    let path: string

    if (filename) {
      this.json = require(`../../src/api/${filename}`)
      path = filename
    } else {
      const slugTitle = Html.getSlugTitle(this.json.title)
      path = `${slugTitle}.json`
    }

    addSitemapPath(path, this.json)

    const settings: ApiSettings = {
      object: this.json,
      path: 'api',
      filename: path,
      pretty: true
    }
    
    return new WriteJsonPlugin(settings)
  }
}

