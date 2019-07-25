import { Collection } from './collections'

/**
 * A file appears!
 */
export class Page<ContentType> {
  static bulkCreate<ContentType> (collection: Collection<ContentType>, section: string, perPage: number): Array<Page<ContentType>> {
    const result: Array<Page<ContentType>> = []

    const pageCount = Math.ceil(collection.length / perPage) || 0

    for (let currentPage = 0; currentPage < pageCount; currentPage++) {
      const start: number = currentPage * perPage
      const end: number = ((currentPage * perPage) + perPage)

      result.push(
        new Page(
          currentPage,
          new Collection<ContentType>().fromArray(collection.slice(start, end)),
          section
        )
        
      )
    }

    return result
  }

  pageNumber: number
  contents: Collection<ContentType>
  section: string

  constructor(pageNumber: number, content: Collection<ContentType>, section: string) {
    this.pageNumber = pageNumber
    this.contents = content
    this.section = section
  }
}