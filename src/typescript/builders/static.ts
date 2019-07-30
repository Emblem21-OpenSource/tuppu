import { StaticSection } from '../sections/static'

/**
 * [buildStatic description]
 */
export const buildStatic = (staticSections: string[]): any[] => {
  const plugins: any[] = []

  for (const section of staticSections) {
    plugins.push(new StaticSection(
      section,
      new Date(),
      section,
      '',
      1
    ).getWebpackPlugin())
  }
  return plugins
}
