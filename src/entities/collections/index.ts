type iterator<T> = (item: T, index: number, array: T[]) => T

type voidIterator<T> = (item: T, index: number, array: T[]) => void

interface CollectionExtractionFilter<T> {
  [key: string]: iterator<T>
}

interface CollectionExtractionPages<T> {
  [key: string]: Array<Array<T>>
}

interface CollectionExtractionList<T> {
  [key: string]: Array<T>
}

interface CollectionExtraction<T> {
  pages: CollectionExtractionPages<T>,
  list: CollectionExtractionList<T>
}


/**
 * A file appears!
 */
export class Collection<ContentType> {
  content: ContentType[] = []

  get length (): number {
    return this.content.length
  }

  /**
   * 
   */
  populate (content: Array<ContentType>): void {
    this.content = this.content.concat(content);
  }

  /**
   * [push description]
   */
  push(item: ContentType): number {
    return this.content.push(item)
  }

  /**
   * [extract description]
   */
  slice (start: number, end: number): ContentType[] {
    return this.content.slice(start, end)    
  }

  /**
   * [extract description]
   */
  forEach (callback: voidIterator<ContentType>): void {
    this.content.forEach(callback)
  }

  /**
   * [extract description]
   */
  map (callback: iterator<ContentType>): ContentType[] {
    return this.content.map(callback)
  }

  /**
   * [extract description]
   */
  filter (callback: iterator<ContentType>): ContentType[] {
    return this.content.filter(callback)
  }

  /**
   * 
   */
  extractLists (filter: CollectionExtractionFilter<ContentType>, transform: CollectionExtractionFilter<ContentType>): CollectionExtractionList<ContentType> {
    const result: CollectionExtractionList<ContentType> = {}

    Object.keys(filter).forEach(key => 
      result.list[key] = this.content.filter(filter[key])
    )

    Object.keys(transform).forEach(key => {
      result.list[key] = this.content.map(transform[key])
    })

    return result
  }

  /**
   * [extract description]
   */
  extractPages (lists: CollectionExtractionList<ContentType>, perPage: number): CollectionExtractionPages<ContentType> {
    const result : CollectionExtractionPages<ContentType> = {}

    Object.keys(lists).forEach(key => {
      const pages: Array<Array<ContentType>> = []

      const pageCount = Math.ceil(result[key].length / perPage) || 0

      for (let currentPage = 0; currentPage < pageCount; currentPage++) {
        const start: number = currentPage * perPage
        const end: number = ((currentPage * perPage) + perPage)
        pages.push(lists[key].slice(start, end))
      }

      result[key] = pages
    })
    return result
  }

  /**
   * 
   */
  extract (filter: CollectionExtractionFilter<ContentType>, transform: CollectionExtractionFilter<ContentType>, perPage: number): CollectionExtraction {
    const lists = this.extractLists(filter, transform)

    return {
      pages: this.extractPages(lists, perPage),
      lists,
    }
  }
}
