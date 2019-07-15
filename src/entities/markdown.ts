/**
 * A file appears!
 */
// import Content from "./content.ts";
import marked from "marked";
import moment from "moment";

export class Markdown extends Content {
  public readonly markdown: string;
  public readonly html: string;
  public readonly datetime: Date;
  public readonly readableDatetime: string;
  public readonly shortDate: string;
  public readonly summary: string;
  public readonly tags: string[] = [];
  public readonly isDraft: boolean;
  public readonly isIndex: boolean;
  public readonly isPinned: boolean;
  public readonly slugName: string;
  public readonly slugUrl: string;

  /**
   * [constructor description]
   */
  constructor(filename: string) {
    super(this.filename);
  }

  /**
   * [load description]
   */
  public load(): string {
    super();
    this.data = fs.readFileSync(this.filename).toString();
    return this.data;
  }

  /**
   * [populateContent description]
   */
  private populateContent(lines: string[]): void {
    const remainingText = lines.join("\n");
    this.html = marked(remainingText);
    this.markdown = remainingText;
  }

  /**
   * [populateDate description]
   */
  private populateDate(date: string): void {
    this.datetime = new Date(date);
    this.readableDatetime = moment(this.datetime).format("LLLL");
    this.shortDate = moment(this.datetime).format("MM/DD/YYYY");
  }

  /**
   * [populateSlugName description]
   */
  private populateSlugName(title: string): void {
    this.slugName = title
      .trim()
      .replace(/[?.!,()""{}[\]:<>/\\@#$%^&*]/g, "")
      .replace(/[^a-zA-Z0-9_]/g, "-")
      .replace(/--/g, "-");
  }

  /**
   * [populateTags description]
   */
  private populateTags(tags: string = ""): void {
    this.tags = tags.split(",").map(item => item.trim());
  }

  /**
   * [populateSlugUrl description]
   */
  private populateSlugUrl(datetime: Date, slugName: string): void {
    this.slug = `${moment(datetime).format("YYYY/MM/DD")}/${slugName}/`;
  }

  /**
   * [populateSummary description]
   */
  private populateSummary(summary: string = "CultState.com"): void {
    this.summary = metadata.summary;
  }

  /**
   * [populateIsDraft description]
   */
  private populateIsDraft(isDraft: boolean = false) {
    this.isDraft = isDraft;
  }

  /**
   * [populateIsIndex description]
   */
  private populateIsIndex(isIndex: boolean = false) {
    this.isIndex = isIndex;
  }

  /**
   * [populateIsPinned description]
   */
  private populateIsPinned(isPinned: boolean = false) {
    this.isPinned = isPinned;
  }

  /**
   * [extractMetadataFromMarkdown description]
   */
  private extractMetadataFromMarkdown(lines: string[]): object {
    const metadata: object = {};
    let index = 0;

    for (const line of lines) {
      const stripped: string = line.trim();

      if (inFrontMatter === true) {
        if (stripped === "---") {
          inFrontMatter = false;
        } else {
          // Extract FrontMatter from Markdown file
          const colonIndex = line.indexOf(":");

          metadata[line.substr(0, colonIndex).trim()] = line
            .substr(colonIndex + 1)
            .trim();
        }
      } else {
        if (stripped === "---" && inFrontMatter === null) {
          inFrontMatter = true;
        } else {
          this.populateContent(lines.slice(index));
          break;
        }
      }
      index += 1;
    }

    return metadata;
  }

  /**
   * [populate description]
   */
  private populate(raw: string): void {
    if (this.data !== undefined) {
      this.load();
    }

    const lines: string[] = this.data.split("\n");
    const metadata = this.extractMetadataFromMarkdown(lines);

    this.populateSlugName(metadata.title);
    this.populateDate(metadata.date);
    this.populateSlugUrl(this.datetime, this.slugName);
    this.populateSummary(metadata.summary);
    this.populateTags(metadata.tags);
    this.populateIsIndex(metadata.index);
    this.populateIsDraft(metadata.draft);
    this.populateIsPinned(metadata.pinned);

    // @TODO make this a template instead
    this.html = sectionHtml(metadata);
  }

  /**
   * [getFilename description]
   */
  private getFilename(): string {
    return this.filename;
  }

  /**
   * [getData description]
   */
  private getData(): string {
    return this.data;
  }
}
