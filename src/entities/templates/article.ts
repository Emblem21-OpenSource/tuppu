import HtmlWebpackPlugin from 'html-webpack-plugin'

import { HtmlOutput } from '../htmlOutput'
import { ArticleSection } from '../sections/articleSection'
import { Markdown } from '../content/markdown'

import { Template } from '.'

interface ArticleSettings {
  inject: boolean
  minify: {
    removeComments: boolean,
    collapseWhitespace: boolean
  }
  filename: string
  template: string
  templateParameters: {
    article: Markdown
    showTagHeader: true
    relatedArticles: Markdown[]
    head: HtmlOutput
  }
}

export class ArticleTemplate extends Template<ArticleSettings> {
  constructor (section: ArticleSection, article: Markdown, relatedArticles: Markdown[] = []) {
    const html: HtmlOutput = section.html as HtmlOutput

    const settings: ArticleSettings = {
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      filename: `${html.title}.html`,
      template: `src/theme/sections/${html.slugName}.hbs`,
      templateParameters: {
        article,
        showTagHeader: true,
        relatedArticles,
        head: html
      }
    }

    super(settings)
  }

  generate (): ArticleSettings {
    return new HtmlWebpackPlugin(this.settings)
  }
}