/**
 * A file appears!
 */
import { Html } from '../content/html'

import { Section } from '.'

export class StaticSection extends Section<Html> {
  populate (): void {
    // @TODO static template
  }
}
