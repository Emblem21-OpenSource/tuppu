/**
 * A file appears!
 */
import HtmlWebpackPlugin from 'html-webpack-plugin'

import { HtmlParameters } from '../content/html'
import { Content } from '../content'
import { addSitemapPath } from '../content/sitemap'

import { Section } from '.'

interface ArticleSettings {
  inject: boolean
  minify: {
    removeComments: boolean,
    collapseWhitespace: boolean
  }
  filename: string
  template: string
  templateParameters: HtmlParameters & {
    article: Content
    showTagHeader: true
    relatedArticles: Content[]
  }
}

export class ArticleSection extends Section {
  constructor (title: string, date: Date, summary: string, image: string, perPage: number) {
    super(title, date, summary, image, perPage)
  }

  getWebpackPlugin(article: Content, relatedArticles: Content[]): any {
    const filename = `${this.html.url}index.html`

    addSitemapPath(filename, article)

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
        article,
        showTagHeader: true,
        relatedArticles
      }
    }
    
    return new HtmlWebpackPlugin(settings)
  }
}

