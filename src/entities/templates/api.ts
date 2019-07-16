import HtmlWebpackPlugin from 'html-webpack-plugin'

import { HtmlOutput } from '../htmlOutput'
import { ArticleSection } from '../sections/articleSection'

import { Template } from '.'

interface ApiSettings {
  inject: boolean
  minify: {
    removeComments: boolean,
    collapseWhitespace: boolean
  }
  filename: string
  template: string
  templateParameters: {
    head: HtmlOutput
  }
}

export class ApiTemplate extends Template<ApiSettings> {
  constructor (section: ArticleSection) {
    const html: HtmlOutput = section.html as HtmlOutput

    const settings: ApiSettings = {
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      filename: `${html.title}.html`,
      template: `src/theme/sections/${html.slugName}.hbs`,
      templateParameters: {
        head: html
      }
    }

    super(settings)
  }

  generate (): ApiSettings {
    return new HtmlWebpackPlugin(this.settings)
  }
}