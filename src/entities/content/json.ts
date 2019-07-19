/**
 * A file appears!
 */
import { Content, WebpackTemplate } from '.'

export class Json extends Content {
    sourceContent: Content

    constructor (content: Content) {
      super(content.filename)
      this.sourceContent = content
    }

    getContent (): WebpackTemplate {
      const templateOutput = super.getContent()
      templateOutput.body = '' // @TODO
      const { title, summary, body, image, url, datetime, isDraft, isIndex, isPinned, tags } = templateOutput
      return { title, summary, body, image, url, datetime, isDraft, isIndex, isPinned, tags }
    }
}
