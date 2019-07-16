import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Template } from '.'
import { HtmlOutput } from '../htmlOutput'
import { ArticleSection } from '../sections/articleSection';

interface ArticleSettings {
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

export class ArticleTemplate extends Template<ArticleSettings> {
  constructor (section: ArticleSection) {
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
        head: html
      }
    }

    super(settings)
  }

  public generate (): ArticleSettings {
    return new HtmlWebpackPlugin(this.settings)
  }
}