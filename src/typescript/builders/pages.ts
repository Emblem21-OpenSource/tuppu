import { Markdown } from '../content/markdown'
import { Collection } from '../collections'
import { PageSection } from '../sections/page'
import { Page } from '../page'

/**
 * [buildPages description]
 */
export const buildPages = (contents: Collection<Markdown>, sections: string[], perPage: number): any[] => {
  const plugins: any[] = []

  for (const section of sections) {
    const sectionCollection = new Collection<Markdown>().fromArray(
      contents.filter(content =>
        content.article.section === section
      )
    )

    const pages = Page.bulkCreate<Markdown>(sectionCollection, section, perPage)

    for (const page of pages) {
      plugins.push(new PageSection(
        page,
        perPage,
        pages.length,
        sectionCollection.length
      ).getWebpackPlugin(sectionCollection))
    }
  }

  return plugins
}
