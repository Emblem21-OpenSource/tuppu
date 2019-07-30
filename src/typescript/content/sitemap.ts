import SitemapWebpackPlugin from 'sitemap-webpack-plugin'
import moment from 'moment'

import { getHost } from '../config'

import { Json } from './json'
import { Markdown } from './markdown'
import { Article } from './article'
import { Html } from './html'

interface SitemapSettings {
  path: string
  lastMod: string
  priority: string
  changeFreq: string
}

const paths: SitemapSettings[] = []

export const addSitemapPath = (path: string, content: Date | Article | Markdown | Html | Json) => { 
    let lastMod: string

    if (content instanceof Markdown) {
      // Markdown
      lastMod = moment(content.html.datetime).format('YYYY/MM/DD')
    } else if (content instanceof Html) {
      // Html
      lastMod = moment(content.datetime).format('YYYY/MM/DD')
    } else if ((content as Json).datetime) {
      // Json
      lastMod = (content as Json).url.split('/').slice(0, 3).join('/')
    } else if (content instanceof Date) {
      // Date
      lastMod = moment(content).format('YYYY/MM/DD')
    } else {
      // Article
      lastMod = moment((content as Article).date).format('YYYY/MM/DD')
    }

  paths.push({
    path,
    lastMod,
    priority: '0.8',
    changeFreq: 'monthly'
  })
}

export const getWebpackPlugin = () => {
  return new SitemapWebpackPlugin(getHost(), paths)
}
