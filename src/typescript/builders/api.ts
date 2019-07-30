import { Json } from '../content/json'
import { Markdown } from '../content/markdown'
import { Collection } from '../collections'
import { ApiSection } from '../sections/api'
import { Page } from '../page'

/**
 * [buildApi description]
 */
export const buildApi = (contents: Collection<Markdown>, sections: string[], perPage: number): any[] => {
  const plugins: any[] = []

  for (const section of sections) {
    const jsons: Json[] = []

    const sectionCollection = new Collection<Markdown>().fromArray(
      contents.filter(content =>
        content.article.section === section
      )     
    )

    sectionCollection.forEach(item => jsons.push(item.article.body.json as Json))

    const jsonSection = new Collection<Json>().fromArray(jsons)

    const pages = Page.bulkCreate<Json>(jsonSection, section, perPage)

    for (const page of pages) {
      plugins.push(new ApiSection(
        page,
        perPage,
        pages.length,
        sectionCollection.length
      ).getWebpackPlugin())
    }
  }

  plugins.push(ApiSection.getIndexWebpackPluging())

  return plugins
}
