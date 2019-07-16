/**
 * A file appears!
 */
export abstract class Template<Settings> {
  protected settings: Settings | null = null

  constructor (settings: Settings) {
      this.settings = settings
  }

  abstract generate (): any
}