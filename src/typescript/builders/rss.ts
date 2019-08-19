import { Rss } from '../content/rss'
import { Markdown } from '../content/markdown'
import { Collection } from '../collections'
import { RssSection } from '../sections/rss'
import { Page } from '../page'

/**
 * [buildRss description]
 */
export const buildRss = (contents: Collection<Markdown>, sections: string[], perPage: number): any[] => {
  const plugins: any[] = []

  for (const section of sections) {
    const rss: Rss[] = []

    const sectionCollection = new Collection<Markdown>().fromArray(
      contents.filter(content =>
        content.article.section === section
      )     
    )

    sectionCollection.forEach(item => rss.push(item.article.body.rss as Rss))

    const rssSection = new Collection<Rss>().fromArray(rss)

    const pages = Page.bulkCreate<Rss>(rssSection, section, perPage)

    for (const page of pages) {
      plugins.push(new RssSection(
        page,
        perPage,
        pages.length,
        sectionCollection.length
      ).getWebpackPlugin())
    }
  }

  plugins.push(RssSection.getIndexWebpackPluging())

  return plugins
}
