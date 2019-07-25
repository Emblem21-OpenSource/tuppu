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
  templateParameters: HtmlParameters
}


export class StaticSection extends Section {
  constructor (title: string, date: Date, summary: string, image: string, perPage: number) {
    super(title, date, summary, image, perPage)
  }

  getWebpackPlugin(): any {
    const settings: StaticSettings = {
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      filename: `${this.html.slugTitle}.html`,
      template: `src/theme/sections/${this.html.slugTitle}.hbs`,
      templateParameters: this.html
    }
    
    return new HtmlWebpackPlugin(settings)
  }
}
