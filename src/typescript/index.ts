import 'source-map-support/register'

import { Markdown } from './content/markdown'
import { MarkdownCollection } from './collections/markdown'
import { Collection } from './collections'

import { buildIndex } from './builders/index'
import { buildArticles } from './builders/articles'
import { buildPages } from './builders/pages'
import { buildApi } from './builders/api'
import { buildStatic } from './builders/static'


const perPage = 3

const sections: string[] = [
  'Articles',
  'Books',
  'Code',
  'Podcasts',
  'Training'
]


const staticSections: string[] = [
  'Bias',
  'Contact'
]


export const getWebpackTemplates = (): any[] => {
  let webpackPlugins: any[] = []

  const contents = getContent()

  webpackPlugins = webpackPlugins.concat(buildIndex(contents, perPage))
  webpackPlugins = webpackPlugins.concat(buildArticles(contents))
  webpackPlugins = webpackPlugins.concat(buildPages(contents, sections, perPage))
  webpackPlugins = webpackPlugins.concat(buildApi(contents, sections, 25))
  webpackPlugins = webpackPlugins.concat(buildStatic(staticSections))

  return webpackPlugins
}

/**
 * [getContent description]
 */
const getContent = (): Collection<Markdown> => {
  const markdownCollections: MarkdownCollection[] = []

  for (const section of sections) {
    const collection = new MarkdownCollection(section)
    markdownCollections.push(collection)
  }

  const content = new Collection<Markdown>().absorb(markdownCollections)

  content.internalSort((a, b) => {
    return (b.article.date as Date).getTime() - (a.article.date as Date).getTime()
  })

  return content
}
