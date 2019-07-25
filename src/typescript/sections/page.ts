/**
 * A file appears!
 */
import HtmlWebpackPlugin from 'html-webpack-plugin'

import { Markdown } from '../content/markdown'
import { HtmlParameters } from '../content/html'
import { Page } from '../page'
import { addSitemapPath } from '../content/sitemap'

import { Section } from '.'

export interface PageSettings {
  inject: boolean
  minify: {
    removeComments: boolean,
    collapseWhitespace: boolean
  }
  filename: string
  template: string
  templateParameters: HtmlParameters & {
    articles: Markdown[]
    showTagHeader: boolean
    next: string
    previous: string
  }
}

export class PageSection extends Section {
  page: Page<Markdown>
  totalPages: number
  totalArticles: number

  constructor (page: Page<Markdown>, perPage: number, totalPages: number, totalArticles: number) {
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

  getWebpackPlugin(): any[] {
    const { filename, next, previous } = this.getPagination()
    const articles = this.page.contents.map(content => content)

    addSitemapPath(filename, new Date())

    const settings: PageSettings = {
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      filename,
      template: 'src/theme/html/article.hbs',
      templateParameters: {
        ...this.html,
        articles,
        showTagHeader: true,
        next,
        previous
      }
    }
    
    return new HtmlWebpackPlugin(settings)
  }

  getPagination (): { filename: string, next: string, previous: string } {
    let previous: string
    let next: string

    const currentPage: number = this.page.pageNumber

    const filename = currentPage === 0
      ? `${this.html.slugTitle}.html`
      : this.html.slugTitle === 'index'
        ? `page/${(currentPage + 1)}/index.html`
        : `${this.html.slugTitle}/page/${(currentPage + 1)}/index.html`

    if (currentPage === 0 && this.totalArticles >= (this.perPage - 1)) {
      previous = ''
    } else {
      previous = currentPage === 1
        ? `/${this.html.slugTitle}.html`
        : this.html.slugTitle === 'index'
          ? `/page/${(currentPage)}/index.html`
          : `/${this.html.slugTitle}/page/${(currentPage)}/index.html`
      }

    if (currentPage >= (this.totalPages - 1)) {
      next = ''
    } else {
      next = this.html.slugTitle === 'index'
        ? `/page/${(currentPage + 2)}/index.html`
        : `/${this.html.slugTitle}/page/${(currentPage + 2)}/index.html`
    }

    return { filename, previous, next }
  }
}
