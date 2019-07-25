type iterator<T> = (item: T, index: number, array: T[]) => T

type booleanIterator<T> = (item: T, index: number, array: T[]) => string | null | undefined | boolean

type voidIterator<T> = (item: T, index: number, array: T[]) => void

type sortIterator<T> = (a: T, b: T) => number

interface CollectionExtractionFilter<T> {
  [key: string]: iterator<T>
}

interface CollectionExtractionPages<T> {
  [key: string]: T[][]
}

interface CollectionExtractionList<T> {
  [key: string]: T[]
}

interface CollectionExtraction<T> {
  pages: CollectionExtractionPages<T>,
  lists: CollectionExtractionList<T>
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
   * [fromArray description]
   */
  fromArray(content: ContentType[]): Collection<ContentType> {
    this.content = content
    return this
  }

  /**
   * [absorb description]
   */
  absorb (collections: Array<Collection<ContentType>>): Collection<ContentType> {
    for (const collection of collections) {
      this.content = this.content.concat(collection.content)
    }

    return this
  }

  /**
   * 
   */
  populate (content: ContentType[]): void {
    this.content = this.content.concat(content)
  }

  /**
   * [push description]
   */
  push(item: ContentType): number {
    return this.content.push(item)
  }

  /**
   * [sort description]
   */
  sort(callback: sortIterator<ContentType>): ContentType[] {
    return this.content.sort(callback)
  }

  /**
   * [internalSort description]
   */
  internalSort(callback: sortIterator<ContentType>): void {
    this.content = this.content.sort(callback)
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
  map (callback: iterator<ContentType>): any[] {
    return this.content.map(callback)
  }

  /**
   * [extract description]
   */
  transform (callback: iterator<ContentType>): ContentType[] {
    this.content = this.content.map(callback)
    return this.content
  }


  /**
   * [extract description]
   */
  filter (callback: booleanIterator<ContentType>): ContentType[] {
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
      const pages: ContentType[][] = []

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
  extract (filter: CollectionExtractionFilter<ContentType>, transform: CollectionExtractionFilter<ContentType>, perPage: number): CollectionExtraction<ContentType> {
    const lists = this.extractLists(filter, transform)

    return {
      pages: this.extractPages(lists, perPage),
      lists
    }
  }
}
