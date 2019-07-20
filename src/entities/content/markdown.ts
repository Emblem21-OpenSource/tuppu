/**
 * A file appears!
 */
import fs from 'fs'
import marked from 'marked'

import { Content } from '.'

export interface MarkdownMetadata {
  title: string
  datetime: string
  summary: string
  image: string
  draft: string
  index: string
  pinned: string
  tags: string
  body: string
}

export class Markdown extends Content {
  constructor(sourcePath: string) {
    const lines = fs.readFileSync(sourcePath).toString().split('\n')

    const metadata: MarkdownMetadata = {
      title: '',
      datetime: '',
      summary: '',
      image: '',
      draft: '',
      index: '',
      pinned: '',
      tags: '',    
      body: ''
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
          metadata.body = lines.slice(index).join('\n')
          break
        }
      }
      index += 1
    }

    super(
      metadata.title,
      sourcePath,
      new Date(metadata.datetime),
      metadata.summary,
      metadata.image,
      metadata.draft === 'true',
      metadata.index === 'true',
      metadata.pinned === 'true',
      metadata.tags
     )

    this.body.markdown = metadata.body
    this.body.html = marked(this.body.markdown)
    this.body.text = this.stripAndExplodeContent(this.body.markdown).join('\n')
    this.populateFrequentWords(this.body.text) 
  }
}
