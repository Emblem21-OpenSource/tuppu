import HtmlWebpackPlugin from 'html-webpack-plugin'

import { HtmlParameters } from '../content/html'

import { Section } from '.'

interface StaticSettings {
  inject: boolean
  minify: {
    removeComments: boolean,
    collapseWhitespace: boolean
  }
  filename: string
  template: string
  templateParameters: {
    html: HtmlParameters
  }
}


export class StaticSection extends Section {
  constructor (title: string, date: Date, summary: string, image: string, perPage: number) {
    super(title, date, summary, image, perPage)
  }

  getWebpackPlugin(): any {
    const pathName = this.html.slugTitle.toLowerCase()

    const settings: StaticSettings = {
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      filename: `${pathName}/index.html`,
      template: `src/theme/sections/${pathName}.hbs`,
      templateParameters: {
        html: this.html
      }
    }
    
    return new HtmlWebpackPlugin(settings)
  }
}
