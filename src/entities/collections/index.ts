type iterator<T> = (item: T, index: number, array: T[]) => T

interface CollectionExtractionFilter<ContentType> {
  [key: string]: iterator<ContentType>
}

interface CollectionExtractionResult<ContentType> {
  [key: string]: ContentType[]
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
  forEach (callback: iterator<ContentType>): void {
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
   * [extract description]
   */
  extract (filter: CollectionExtractionFilter<ContentType>, transform: CollectionExtractionFilter<ContentType>): CollectionExtractionResult<ContentType> {
    const result: CollectionExtractionResult<ContentType> = {}

    Object.keys(filter).forEach(key => 
      result[key] = this.content.filter(filter[key])
    )

    Object.keys(transform).forEach(key => {
      result[key] = this.content.map(transform[key])
    })

    return result
  }
}
