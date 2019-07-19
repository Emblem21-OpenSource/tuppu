/**
 * A file appears!
 */
import marked from 'marked'

import { HtmlOutput } from '../htmlOutput'

import { Content } from '.'

export interface MarkdownRawMetadata {
  markdown: string
  html: string
  title: string
  datetime: string
  summary: string
  tags: string
  draft: string
  index: string
  pinned: string
  image: string
}

export class Markdown extends Content {
  /**
   * [populate description]
   */
  populate(raw: string): void {
    if (this.data !== undefined) {
      // The Markdown instance needs to be populated
      this.load()
    }

    const lines: string[] = this.data.split('\n')
    const metadata = this.extractMetadataFromMarkdown(lines)
    const htmlBody = marked(this.markdown)
    this.populateHtml(new HtmlOutput(
      this.datetime as Date,
      metadata.title,
      metadata.summary,
      metadata.image,
      htmlBody
    ))

    this.populateTitle(metadata.title)
    this.populateDate(metadata.datetime)
    this.populateTags(metadata.tags)
    this.populateIsIndex(metadata.index === 'true')
    this.populateIsDraft(metadata.draft === 'true')
    this.populateIsPinned(metadata.pinned === 'true')
  }

  /**
   * [populateContent description]
   */
  private populateContent(lines: string[]): void {
    const remainingText = lines.join('\n')
    this.markdown = remainingText
  }

  /**
   * [extractMetadataFromMarkdown description]
   */
  private extractMetadataFromMarkdown(lines: string[]): MarkdownRawMetadata {
    const metadata: MarkdownRawMetadata = {
      markdown: '',
      html: '',
      title: '',
      datetime: '',
      summary: '',
      tags: '',
      draft: '',
      index: '',
      pinned: '',
      image: ''
    }

    let inFrontMatter = false
    let index = 0

    for (const line of lines) {
      const stripped: string = line.trim()

      if (inFrontMatter === true) {
        if (stripped === '---') {
          inFrontMatter = false
        } else {
          // Extract FrontMatter from Markdown file
          const colonIndex = line.indexOf(':')

          metadata[line.substr(0, colonIndex).trim()] = line
            .substr(colonIndex + 1)
            .trim()
        }
      } else {
        if (stripped === '---' && inFrontMatter === null) {
          inFrontMatter = true
        } else {
          this.populateContent(lines.slice(index))
          break
        }
      }
      index += 1
    }

    return metadata
  }
}
