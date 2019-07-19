/**
 * A file appears!
 */
import { HtmlOutput } from '../htmlOutput'

import { Content } from '.'

export class Html extends Content {
  populate () {
    this.populateHtml(new HtmlOutput(
      this.datetime as Date,
      this.title as string,
      this.summary as string,
      this.image as string,
      ''
    ))
  }
}
