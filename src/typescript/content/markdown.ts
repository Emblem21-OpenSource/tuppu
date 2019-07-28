import fs from 'fs'
import striptags from 'striptags'

import { Marked } from '../utils/markdown'

import { Html } from './html'
import { Article, ArticleBody } from './article'
import { Json } from './json'

let nextId = 1

export class Markdown {

  id: number
  sourcePath: string
  article: Article = {
    body: {}
  }
  html: Html

  constructor(sourcePath: string, sectionName: string) {
    this.sourcePath = sourcePath
    this.article = this.load()
    this.article.section = sectionName

    const body = this.article.body as ArticleBody

    this.html = new Html(
      this.article.title as string,
      this.article.date as Date, 
      this.article.summary as string, 
      this.article.image as string,
      body.text as string
    )

    this.article.frequentWords = this.html.keywords.split(', ')

    body.json = {
      title: this.html.summary,
      datetime: this.html.datetime,
      summary: this.html.summary,
      image: this.html.image,
      isDraft: this.article.isDraft as boolean,
      isIndex: this.article.isIndex as boolean,
      isPinned: this.article.isPinned as boolean,
      text: body.text as string,
      url: this.html.url,
      frequentWords: this.article.frequentWords,
      tags: this.article.tags as string[]
    }

    this.id = nextId
    nextId += 1
  }

  /**
   * [asJSON description]
   */
  asJSON (): Json {
    const body = this.article.body as ArticleBody
    return body.json as Json
  }

  /**
   * [load description]
   */
  private load (): Article {
    const result: Article = {
      body: {},
      tags: []
    }
    const body = result.body as ArticleBody
    const lines = fs.readFileSync(this.sourcePath).toString().split('\n')

    let inFrontMatter: boolean | null = null
    let index = 0

    for (const line of lines) {
      const stripped: string = line.trim()

      if (inFrontMatter === true) {
        if (stripped === '---') {
          inFrontMatter = false
        } else {
          // Extract FrontMatter from Markdown file
          const colonIndex = line.indexOf(':')

          let property: string = line.substr(0, colonIndex).trim()
          let value: string | string[] | Date | boolean = line.substr(colonIndex + 1).trim()

          switch (property) {
            case 'draft':
              property = 'isDraft'
              value = value === 'true'
              break
            case 'pinned':
              property = 'isPinned'
              value = value === 'true'
              break
            case 'index':
              property = 'isIndex'
              value = value === 'true'
              break
            case 'tags':
              value = value.split(',').map(tag => tag.trim())
              break
            case 'date':
              value = new Date(value)
              break
          }
          result[property] = value
        }
      } else {
        if (stripped === '---' && inFrontMatter === null) {
          inFrontMatter = true
        } else {
          body.markdown = lines.slice(index).join('\n')
          break
        }
      }
      index += 1
    }
    body.html = Marked(body.markdown)
    body.text = striptags(body.html as string)

    return result
  }
}
