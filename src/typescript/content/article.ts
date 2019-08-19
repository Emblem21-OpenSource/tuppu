import { Json } from './json'
import { Rss } from './rss'

export interface ArticleBody {
  html?: string
  markdown?: string | undefined
  text?: string | undefined,
  json?: Json,
  rss?: Rss
}

export interface Article {
  title?: string
  summary?: string 
  author?: string 
  image?: string
  date?: Date
  contact?: string
  isDraft?: boolean
  isIndex?: boolean
  isPinned?: boolean
  tags?: string[]
  frequentWords?: string[]
  section?: string
  body: ArticleBody
}

