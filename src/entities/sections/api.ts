/**
 * A file appears!
 */
import WriteJsonPlugin from 'write-json-webpack-plugin'

import { Json } from '../content/json'
import { Markdown } from '../content/markdown'
import { ArticleBody } from '../content/article'
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

  getWebpackPlugin(content: string | Markdown): any {
    let json: Json
    let filename: string

    if (typeof content === 'string') {
      json = require(`../../src/api/${content}`)
      filename = content
    } else {
      const body = content.article.body as ArticleBody
      json = body.json as Json
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

