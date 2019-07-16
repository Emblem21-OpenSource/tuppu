type iterator<T> = (item: T, index?: number) => void

/**
 * A file appears!
 */
export class Collection<ContentType> {
  content: ContentType[] = []

  get length (): number {
    return this.content.length
  }

  public slice (start: number, end: number): ContentType[] {
    return this.content.slice(start, end)    
  }

  public forEach (callback: iterator<ContentType>) {
    this.content.forEach(callback)
  }

  public map (callback: iterator<ContentType>) {
    this.content.map(callback)
  }

  public filter (callback: iterator<ContentType>) {
    this.content.filter(callback)
  }
}
