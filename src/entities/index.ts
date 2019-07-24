import { Markdown } from './content/markdown'
import { MarkdownCollection } from './collections/markdown'
import { Collection } from './collections'
import { MarkdownSection } from './sections/markdown'
import { ArticleSection } from './sections/articles'

export const generateTemplates = (): any[] => {
  const webpackPlugins: any[] = []
  const sections: string[] = [
    'articles',
    'books',
    'code',
    'podcasts',
    'training',
    'bias',
    'contact',
  ]

  let section: string

  // Gather all content

  const markdownCollections: MarkdownCollection[] = []

  for (section of sections) {
    const collection = new MarkdownCollection(section)
    markdownCollections.push(collection)
  }

  const contents = new Collection<Markdown>().absorb(markdownCollections)

  // Generate individual articles

  contents.forEach(content => {
    const relatedArticles = contents.filter(
      item => item.id !== content.id && content.tags.find(item.tags.includes)
     )

    webpackPlugins.push(new MarkdownSection(content, 1).getWebpackPlugin(relatedArticles))
  })

  // Generate article section pages

  for (section of sections) {
    const sectionArticles = new Collection<Markdown>().fromArray(
      contents.filter(content => 
        content.sectionName === section
      )
    )

    const sectionName = section[0].toUpperCase + section.substr(1)

    webpackPlugins.push(new ArticleSection(
      sectionName,
      new Date(),
      sectionName,
      '',
      3,
      sectionArticles
    ).getWebpackPlugin())
  }

  return webpackPlugins
}