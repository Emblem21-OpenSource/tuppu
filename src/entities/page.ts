/**
 * A file appears!
 */
export class Page<ContentType> {
  pageNumber: number
  contents: ContentType[] = []

  constructor(pageNumber: number, content: ContentType[]) {
    this.pageNumber = pageNumber
    this.contents = content
  }
}