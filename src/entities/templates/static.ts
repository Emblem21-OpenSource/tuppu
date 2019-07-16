import HtmlWebpackPlugin from 'html-webpack-plugin'

import { StaticSection } from '../sections/staticSection'
import { HtmlOutput } from '../htmlOutput'

import { Template } from '.'

interface StaticSettings {
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

export class StaticTemplate extends Template<StaticSettings> {
  constructor (section: StaticSection) {
    const html: HtmlOutput = section.html as HtmlOutput

    const settings: StaticSettings = {
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

  generate (): StaticSettings {
    return new HtmlWebpackPlugin(this.settings)
  }
}