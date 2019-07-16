/**
 * A file appears!
 */
import { Section } from '.';
import { Html } from '../content/html';

export class StaticSection extends Section<Html> {
  public populate (): void {
    // @TODO static template
  }
}
