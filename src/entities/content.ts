/**
 * A file appears!
 */
import fs from "fs";

export class Content {
  private filename: string;
  private data: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  public size(): number {
    return data.length;
  }

  public load(): string {
    this.data = fs.readFileSync(this.filename).toString();
    return this.data;
  }

  private getFilename(): string {
    return this.filename;
  }

  private getData(): string {
    return this.data;
  }
}
