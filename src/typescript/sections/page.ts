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
  templateParameters: {
    html: HtmlParameters
    articles: Markdown[]
    pinnedArticles: Markdown[]
    hasPinnedArticles: boolean
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
      perPage,
      page.contents
    )
    this.page = page
    this.totalPages = totalPages
    this.totalArticles = totalArticles
  }

  getWebpackPlugin(): any[] {
    const pathName = this.html.slugTitle.toLowerCase()
    const { filename, next, previous } = this.getPagination(pathName)
    const articles: Markdown[] = this.page.contents.map(content => content)
    
    const pinnedArticles = this.page.pageNumber === 0
      ? this.pinned
      : []

    const hasPinnedArticles = this.page.pageNumber === 0 && this.pinned.length > 0

    addSitemapPath(filename, new Date())

    const settings: PageSettings = {
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      filename,
      template: `src/theme/sections/${pathName}.hbs`,
      templateParameters: {
        html: this.html,
        pinnedArticles,
        hasPinnedArticles,
        articles,
        showTagHeader: true,
        next,
        previous
      }
    }
    
    if (this.page.section === 'index') {
      settings.templateParameters.html.title = 'News'
    }

    return new HtmlWebpackPlugin(settings)
  }

  getPagination (pathName: string): { filename: string, next: string, previous: string } {
    let previous: string
    let next: string

    const currentPage: number = this.page.pageNumber

    const filename = currentPage === 0
      ? `${pathName}.html`
      : pathName === 'index'
        ? `page/${(currentPage + 1)}/index.html`
        : `${pathName}/page/${(currentPage + 1)}/index.html`

    if (currentPage === 0) {
      previous = ''
    } else {
      previous = currentPage === 1
        ? `/${pathName}.html`
        : pathName === 'index'
          ? `/page/${(currentPage)}/index.html`
          : `/${pathName}/page/${(currentPage)}/index.html`
      }

    if (currentPage >= (this.totalPages - 1)) {
      next = ''
    } else {
      next = pathName === 'index'
        ? `/page/${(currentPage + 2)}/index.html`
        : `/${pathName}/page/${(currentPage + 2)}/index.html`
    }

    return { filename, previous, next }
  }
}
