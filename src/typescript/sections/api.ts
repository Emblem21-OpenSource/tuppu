/**
 * A file appears!
 */
import WriteJsonPlugin from 'write-json-webpack-plugin'

import { Json } from '../content/json'
import { Page } from '../page'
import { addSitemapPath } from '../content/sitemap'

import { Section } from '.'

interface ApiSettings {
  object: JsonApiPage | JsonIndex
  path: 'api'
  filename: string
  pretty: true
}

interface JsonApiPage {
  links: {
    self: string
    next?: string
    last?: string
  }
  data: JsonApiData[]
}

interface JsonApiData {
  type: string
  id: string
  attributes: Json
  relationships: {
    data: JsonAuthor[]
  }
}

interface JsonAuthor {
  type: string
  name: string
  links: {
    self: string
  }
}

interface JsonIndex {
  links: {
    articles: string
    books: string
    code: string
    podcasts: string
    training: string
  }
}

export class ApiSection extends Section {
  static getIndexWebpackPluging(): any {
    const object: JsonIndex = {
      links: {
        articles: 'api/articles/0.json',
        books: 'api/books/0.json',
        code: 'api/code/0.json',
        podcasts: 'api/podcasts/0.json',
        training: 'api/training/0.json',
      }
    }

    const settings: ApiSettings = {
      object,
      path: 'api',
      filename: 'index.json',
      pretty: true
    }
    
    return new WriteJsonPlugin(settings)
  }

  page: Page<Json>
  totalPages: number
  totalArticles: number


  constructor (page: Page<Json>, perPage: number, totalPages: number, totalArticles: number) {
    super(
      page.section,
      new Date(),
      page.section,
      '',
      perPage
    )
    this.page = page
    this.totalPages = totalPages
    this.totalArticles = totalArticles
  }

  getWebpackPlugin(): any {
    const pathName = this.html.slugTitle.toLowerCase()

    const { filename, next, previous } = this.getPagination(pathName)

    const jsonPage: JsonApiPage = {
      links: {
        self: filename,
        next,
        last: previous
      },
      data: []
    }

    this.page.contents.forEach(json => {
      const jsonData: JsonApiData = {
        type: this.page.section,
        id: json.url,
        attributes: json,
        relationships: {
          data: []
        }
      }

      const authorExists = jsonPage.data.find(data =>
        data.relationships.data.find(author => author.links.self !== json.contact)
      )

      if (!authorExists) {
        jsonData.relationships.data.push({
          type: 'author',
          name: json.author,
          links: {
            self: json.contact
          }
        })
      }

      jsonPage.data.push(jsonData)
    })

    addSitemapPath(filename, new Date())

    const settings: ApiSettings = {
      object: jsonPage,
      path: 'api',
      filename,
      pretty: true
    }
    
    return new WriteJsonPlugin(settings)
  }

  getPagination (pathName: string): { filename: string, next: string | undefined, previous: string | undefined } {
    let previous: string | undefined
    let next: string | undefined

    const currentPage: number = this.page.pageNumber

    const filename = currentPage === 0
      ? pathName === 'index'
        ? 'index.json'
        : `${pathName}/0.json`
      : pathName === 'index'
        ? `${(currentPage)}.json`
        : `${pathName}/${(currentPage)}.json`

    if (currentPage === 0) {
      previous = undefined
    } else {
      previous = currentPage === 1
        ? `api/${pathName}/0.json`
        : pathName === 'index'
          ? `api/${(currentPage - 1)}.json`
          : `api/${pathName}/${(currentPage - 1)}.json`
      }

    if (currentPage >= (this.totalPages - 1)) {
      next = undefined
    } else {
      next = pathName === 'index'
        ? `api/${(currentPage + 1)}.json`
        : `api/${pathName}/${(currentPage + 1)}.json`
    }

    return { filename, previous, next }
  }
}

