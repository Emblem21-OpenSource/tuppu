import 'source-map-support/register'

import { Markdown } from './content/markdown'
import { MarkdownCollection } from './collections/markdown'
import { Collection } from './collections'
import { MarkdownSection } from './sections/markdown'
import { PageSection } from './sections/page'
import { Page } from './page'

const perPage = 3

const sections: string[] = [
  'articles',
  'books',
  'code',
  'podcasts',
  'training'
]

/*
const staticPages: string[] = [
  'bias',
  'contact'
]
*/

export const getWebpackTemplates = (): any[] => {
  let webpackPlugins: any[] = []

  const contents = getContent()

  webpackPlugins = webpackPlugins.concat(buildIndex(contents))
  webpackPlugins = webpackPlugins.concat(buildArticles(contents))
  webpackPlugins = webpackPlugins.concat(buildPages(contents))
  webpackPlugins = webpackPlugins.concat(buildApi(contents))
  webpackPlugins = webpackPlugins.concat(buildStatic())

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

  return new Collection<Markdown>().absorb(markdownCollections)
}

/**
 * [buildIndex description]
 */
const buildIndex = (contents: Collection<Markdown>): any[] => {
  const plugins: any[] = []

  const sectionCollection = new Collection<Markdown>().fromArray(
    contents.filter(content =>
      content.article.section === 'articles'
    )
  )

  const pages = Page.bulkCreate(sectionCollection, 'index', perPage)

  for (const page of pages) {
    plugins.push(new PageSection(
      page,
      perPage,
      pages.length,
      sectionCollection.length
    ).getWebpackPlugin())
  }

  return plugins
}

/**
 * [buildArticles description]
 */
const buildArticles = (contents: Collection<Markdown>): any[] => {
  const plugins: any[] = []
  contents.forEach(content => {
    const relatedArticles = contents.filter(
      item => {
        return item.id !== content.id && (content.article.tags as string[]).find(tag => {
          return (item.article.tags as string[]).includes(tag)
        })
      }
    )

    plugins.push(new MarkdownSection(content, 1).getWebpackPlugin(relatedArticles))
  })

  return plugins
}

/**
 * [buildPages description]
 */
const buildPages = (contents: Collection<Markdown>): any[] => {
  const plugins: any[] = []

  for (const section of sections) {
    const sectionCollection = new Collection<Markdown>().fromArray(
      contents.filter(content =>
        content.article.section === section
      )
    )

    const pages = Page.bulkCreate(sectionCollection, section, perPage)

    for (const page of pages) {
      plugins.push(new PageSection(
        page,
        perPage,
        pages.length,
        sectionCollection.length
      ).getWebpackPlugin())
    }
  }

  return plugins
}

/**
 * [buildApi description]
 */
const buildApi = (contents: Collection<Markdown>): any[] => {
  const plugins: any[] = []
  return plugins
}

/**
 * [buildStatic description]
 */
const buildStatic = (): any[] => {
  const plugins: any[] = []
  return plugins
}
