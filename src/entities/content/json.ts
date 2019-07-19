/**
 * A file appears!
 */
import { Content, TemplateOutput } from '.'

export class Json extends Content {
    sourceContent: Content

    constructor (content: Content) {
      super(content.filename)
      this.sourceContent = content
    }

    getContent (): TemplateOutput {
      const templateOutput = super.getContent()
      templateOutput.body = '' // @TODO
      const { title, summary, body, image, url, datetime, isDraft, isIndex, isPinned, tags } = templateOutput
      return { title, summary, body, image, url, datetime, isDraft, isIndex, isPinned, tags }
    }
}
