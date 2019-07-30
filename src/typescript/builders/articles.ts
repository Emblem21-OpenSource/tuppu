import { Markdown } from '../content/markdown'
import { Collection } from '../collections'
import { MarkdownSection } from '../sections/markdown'

/**
 * [buildArticles description]
 */
export const buildArticles = (contents: Collection<Markdown>): any[] => {
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
