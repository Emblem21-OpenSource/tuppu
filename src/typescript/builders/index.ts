import { Markdown } from '../content/markdown'
import { Collection } from '../collections'
import { PageSection } from '../sections/page'
import { Page } from '../page'

/**
 * [buildIndex description]
 */
export const buildIndex = (contents: Collection<Markdown>, perPage: number): any[] => {
  const plugins: any[] = []

  const pages = Page.bulkCreate(contents, 'index', perPage)

  for (const page of pages) {
    plugins.push(new PageSection(
      page,
      perPage,
      pages.length,
      contents.length
    ).getWebpackPlugin())
  }

  return plugins
}
