/**
 * A file appears!
 */
import XMLWebpackPlugin from 'xml-webpack-plugin'

import { Rss } from '../content/rss'
import { Page } from '../page'
import { addSitemapPath } from '../content/sitemap'

import { Section } from '.'

interface RssPage {
  template: string
  filename: string
  writeToContext: true
  data: {
      channel: RssChannel
  }
}

interface RssChannel {
  title: string
  link: string
  description: string
  lastBuildDate: string
  pubDate: string
  ttl: string

  items: RssItem[]
}

interface RssItem {
  item: {
    title: string
    link: string
    description: string
  }
}

export class RssSection extends Section {
  page: Page<Rss>
  totalPages: number
  totalArticles: number


  constructor (page: Page<Rss>, perPage: number, totalPages: number, totalArticles: number) {
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

    const rssItems: RssItem[] = []

    this.page.contents.forEach(rss => {
      const url = `/${rss.url}`

      const rssData: RssData = {
        type: this.page.section,
        id: url,
        attributes: { ...rss },
        relationships: {
          data: []
        }
      }

      rssData.attributes.url = url

      const authorExists = rssPage.data.find(data =>
        data.relationships.data.find(author => author.links.self !== rss.contact)
        // @TODO extract urls too
        // @TODO extract images too
      )

      if (!authorExists) {
        rssData.relationships.data.push({
          type: 'author',
          name: rss.author,
          links: {
            self: rss.contact
          }
        })
      }

      rssItems.push(rssData)
    })

    addSitemapPath(filename, new Date())

    const rssPages: RssPage = {
      template: '',
      filename: '',
      writeToContext: true,
      data: {
        channel: {
          title: '',
          link: '',
          description: '',
          lastBuildDate: '',
          pubDate: '',
          ttl: '',
          items: rssItems
        }
      }]
    }
    
    return new XMLWebpackPlugin({
        files: [ rssPages ]
    })
  }

  getPagination (pathName: string): { filename: string, next: string | undefined, previous: string | undefined } {
    let previous: string | undefined
    let next: string | undefined

    const currentPage: number = this.page.pageNumber

    const filename = currentPage === 0
      ? pathName === 'index'
        ? 'index.rss'
        : `${pathName}/0.rss`
      : pathName === 'index'
        ? `${(currentPage)}.rss`
        : `${pathName}/${(currentPage)}.rss`

    if (currentPage === 0) {
      previous = undefined
    } else {
      previous = currentPage === 1
        ? `api/${pathName}/0.rss`
        : pathName === 'index'
          ? `api/${(currentPage - 1)}.rss`
          : `api/${pathName}/${(currentPage - 1)}.rss`
      }

    if (currentPage >= (this.totalPages - 1)) {
      next = undefined
    } else {
      next = pathName === 'index'
        ? `api/${(currentPage + 1)}.rss`
        : `api/${pathName}/${(currentPage + 1)}.rss`
    }

    return { filename, previous, next }
  }
}

