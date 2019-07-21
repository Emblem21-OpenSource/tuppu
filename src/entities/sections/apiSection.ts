/**
 * A file appears!
 */
import WriteJsonPlugin from 'write-json-webpack-plugin'

import { Content, JsonContent, ContentBody } from '../content'
import { addSitemapPath } from '../content/sitemap'

import { Section } from '.'

interface ApiSettings {
  object: JsonContent
  path: 'api'
  filename: string
  pretty: true
}

export class ApiSection extends Section {
  constructor (title: string, date: Date, summary: string, image: string, perPage: number) {
    super(title, date, summary, image, perPage)
  }

  getWebpackPlugin(content: string | Content): any {
    let json: JsonContent
    let filename: string

    if (typeof content === 'string') {
      json = require(`../../src/api/${content}`)
      filename = content
    } else {
      const body = content.body as ContentBody
      json = body.json as JsonContent
      filename = `${content.html.slugTitle}.json`
    }

    addSitemapPath(filename, json)

    const settings: ApiSettings = {
      object: json,
      path: 'api',
      filename,
      pretty: true
    }
    
    return new WriteJsonPlugin(settings)
  }
}

