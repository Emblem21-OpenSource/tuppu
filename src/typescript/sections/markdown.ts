/**
 * A file appears!
 */
import HtmlWebpackPlugin from 'html-webpack-plugin'

import { Article } from '../content/article'
import { Markdown } from '../content/markdown'
import { addSitemapPath } from '../content/sitemap'
import { HtmlParameters } from '../content/html'

import { Section } from '.'

export interface MarkdownSettings {
  inject: boolean
  minify: {
    removeComments: boolean,
    collapseWhitespace: boolean
  }
  filename: string
  template: string
  templateParameters: HtmlParameters & {
    article: Article,
    relatedArticles: Markdown[]
    showTagHeader: boolean
  }
}

export class MarkdownSection extends Section {
  markdown: Markdown

  constructor (markdown: Markdown, perPage: number) {
    super(
      markdown.html.title,
      markdown.article.date as Date,
      markdown.html.summary,
      markdown.html.image,
      perPage
    )
    this.markdown = markdown
  }

  getWebpackPlugin(relatedArticles: Markdown[]): any {
    const filename = `${this.html.url}index.html`

    addSitemapPath(filename, this.markdown)

    const settings: MarkdownSettings = {
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      filename,
      template: 'src/theme/html/article.hbs',
      templateParameters: {
        ...this.html,
        article: this.markdown.article,
        showTagHeader: true,
        relatedArticles
      }
    }
    
    return new HtmlWebpackPlugin(settings)
  }
}

