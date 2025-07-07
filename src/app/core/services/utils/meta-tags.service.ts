import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaTagsService {
  private meta = inject(Meta);
  private titleService = inject(Title);

  updateTitle(title: string) {
    this.titleService.setTitle(title);
  }
  getTitle(): string {
    return this.titleService.getTitle();
  }
  updateMetaTags(tags: { name: string; content: string }[]) {
    tags.forEach((tag) => {
      this.meta.updateTag({ name: tag.name, content: tag.content });
    });
  }

  addMetaTags(tags: { name: string; content: string }[]) {
    tags.forEach((tag) => {
      this.meta.addTag({ name: tag.name, content: tag.content });
    });
  }

  removeMetaTag(selector: string) {
    this.meta.removeTag(selector);
  }

  removeAllMetaTags() {
    this.meta.removeTag("name='description'");
    this.meta.removeTag("name='keywords'");
    this.meta.removeTag("property='og:title'");
    this.meta.removeTag("property='og:description'");
  }
}
