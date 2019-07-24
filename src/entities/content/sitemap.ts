import SitemapWebpackPlugin from 'sitemap-webpack-plugin'
import moment from 'moment'

import { Json } from './json'
import { Markdown } from './json'
import { Article } from './article'
import { Html } from './html'

interface SitemapSettings {
  path: string
  lastMod: string
  priority: string
  changeFreq: string
}

const paths: SitemapSettings[] = []

export const addSitemapPath = (path: string, content: Article | Markdown | Html | Json) => { 
    let lastMod: string

    if (content instanceof Markdown) {
      // Markdown
      lastMod = moment(content.html.datetime).format('YYYY/MM/DD')
    } else if (content instanceof Html) {
      // Html
      lastMod = moment(content.datetime).format('YYYY/MM/DD')
    } else if (content.datetime) {
      // Json
      lastMod = content.url.split('/').slice(0, 3).join('/')
    } else {
      // Article
      lastMod = moment(content.html.datetime).format('YYYY/MM/DD')
    }

  paths.push({
    path,
    lastMod,
    priority: '0.8',
    changeFreq: 'monthly'
  })
}

exports.getWebpackPlugin = () => {
  return new SitemapWebpackPlugin('https://cultstate.com', paths)
}
