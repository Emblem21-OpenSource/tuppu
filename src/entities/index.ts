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
  'training',
  'bias',
  'contact',
]


export const generateTemplates = (): any[] => {
  const webpackPlugins: any[] = []

  const contents = getContent()

  buildArticles(contents)
    .forEach(webpackPlugins.push)

  buildPages(contents)
    .forEach(webpackPlugins.push)

  buildApi(contents)
    .forEach(webpackPlugins.push)

  buildStatic()
    .forEach(webpackPlugins.push)

  global.console.log(webpackPlugins)
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
 * [buildArticles description]
 */
const buildArticles = (contents: Collection<Markdown>): any[] => {
  const plugins: any[] = []
  contents.forEach(content => {
    const relatedArticles = contents.filter(
      item => item.id !== content.id && (content.article.tags as string[]).find((item.article.tags as string[]).includes)
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
    const sectionName = section[0].toUpperCase + section.substr(1)

    const sectionCollection = new Collection<Markdown>().fromArray(
      contents.filter(content =>
        content.article.section === section
      )
    )

    const pages = Page.bulkCreate(sectionCollection, sectionName, perPage)

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
 * @type {[type]}
 */
const buildApi = (contents: Collection<Markdown>): any[] => {
  const plugins: any[] = []
  return plugins
}

/**
 * [buildStatic description]
 * @type {[type]}
 */
const buildStatic = (): any[] => {
  const plugins: any[] = []
  return plugins
}