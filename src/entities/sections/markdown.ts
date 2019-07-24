/**
 * A file appears!
 */
import HtmlWebpackPlugin from 'html-webpack-plugin'

import { Content } from '../content'
import { Markdown } from '../content/markdown'
import { addSitemapPath } from '../content/sitemap'

import { ArticleSettings } from './articles'
import { Section } from '.'

export class MarkdownSection extends Section {
  markdown: Markdown

  constructor (article: Markdown, perPage: number) {
    super(
      article.html.title,
      article.date,
      article.html.summary,
      article.html.image,
      perPage
    )
    this.markdown = article
  }

  getWebpackPlugin(relatedArticles: Content[]): any {
    const filename = `${this.html.url}index.html`

    addSitemapPath(filename, this.markdown)

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
        article: this.markdown,
        showTagHeader: true,
        relatedArticles
      }
    }
    
    return new HtmlWebpackPlugin(settings)
  }
}

