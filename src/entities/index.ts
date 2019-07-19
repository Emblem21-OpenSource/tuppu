import { ApiSection } from './sections/apiSection'
import { StaticSection } from './sections/staticSection'
import { ArticleSection } from './sections/articleSection'

name: string, sourcePath: string, templatePath: string, summary: string, keywords: string, image: string, datetime: Date, perPage: number = 3

export const generateTemplates = () => {
    const api = new ApiSection()
}