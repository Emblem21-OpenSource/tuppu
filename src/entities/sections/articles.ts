/**
 * A file appears!
 */
import HtmlWebpackPlugin from 'html-webpack-plugin'

import { HtmlParameters } from '../content/html'
import { Markdown } from '../content/markdown'
import { addSitemapPath } from '../content/sitemap'

import { Section } from '.'

export interface ArticleSettings {
  inject: boolean
  minify: {
    removeComments: boolean,
    collapseWhitespace: boolean
  }
  filename: string
  template: string
  templateParameters: HtmlParameters & {
    article: Markdown
    showTagHeader: boolean
    relatedArticles: Markdown[]
  }
}

export class ArticleSection extends Section {
  getWebpackPlugin(): any {
    const filename = `${this.html.url}index.html`
    const section = Markdown.getBasic(this.html.title, this.html.summary, this.html.image)

    addSitemapPath(filename, section)

    // @TODO Do paginations here

    const settings: ArticleSettings = {
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      filename,
      template: 'src/theme/html/article.hbs',
      templateParameters: {
        ...this.html,
        article: section,
        showTagHeader: true,
        relatedArticles: []
      }
    }
    
    return new HtmlWebpackPlugin(settings)
  }

  private getPages (pages, articlesPerPage, currentPage, currentArticles) {
    const filename = currentPage === 0
      ? `${this.html.slugTitle}.html`
      : this.html.slugTitle === 'index'
        ? `page/${(currentPage + 1)}/index.html`
        : `${this.html.slugTitle}/page/${(currentPage + 1)}/index.html`

    const previous = currentPage === 1
      ? `/${this.html.slugTitle}.html`
      : this.html.slugTitle === 'index'
        ? `/page/${(currentPage)}/index.html`
        : `/${this.html.slugTitle}/page/${(currentPage)}/index.html`

    const next = this.html.slugTitle === 'index'
      ? `/page/${(currentPage + 2)}/index.html`
      : `/${this.html.slugTitle}/page/${(currentPage + 2)}/index.html`

    let pagination = {
      previous: `<a class="pure-button button-navigation previous" href="${previous}">Previous</a>`,
      next: `<a class="pure-button button-navigation next" href="${next}">Next</a>`
    }

    if (currentPage === 0 && currentArticles.length >= (articlesPerPage - 1)) {
      pagination.previous = ''
    }

    if (currentPage >= (pages - 1)) {
      pagination.next = ''
    }

    return { filename, pagination }
  }
}
