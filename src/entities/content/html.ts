/**
 * A file appears!
 */
import { Content } from '.'
import { HtmlOutput } from '../htmlOutput';

export class Html extends Content {
  public populate () {
    this.populateHtml(new HtmlOutput(
      this.title as string,
      this.datetime as string,
      this.summary as string,
      this.tags as string,
      this.image as string
    ))
  }
}
