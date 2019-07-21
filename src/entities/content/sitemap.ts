import SitemapWebpackPlugin from 'sitemap-webpack-plugin'
import moment from 'moment'

import { Content, JsonContent } from '../content'

interface SitemapSettings {
  path: string
  lastMod: string
  priority: string
  changeFreq: string
}

const paths: SitemapSettings[] = []

export const addSitemapPath = (path: string, content: Content | JsonContent) => { 
  const lastMod = content instanceof Content
    ? moment(content.html.datetime).format('YYYY/MM/DD')
    : content.url.split('/').slice(0, 3).join('/')

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
