import { Json } from './json'

export interface ArticleBody {
  html?: string
  markdown?: string | undefined
  text?: string | undefined,
  json?: Json
}

export interface Article {
  title?: string
  summary?: string 
  image?: string
  date?: Date
  contact?: string
  isDraft?: boolean
  isIndex?: boolean
  isPinned?: boolean
  tags?: string[]
  frequentWords?: string[]
  section?: string
  body?: ArticleBody
}

