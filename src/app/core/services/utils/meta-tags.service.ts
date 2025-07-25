import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaTagsService {
  private meta = inject(Meta);
  private titleService = inject(Title);

  addTitle(title: string) {
    this.titleService.setTitle(title);
    this.addMetaTags([
      {
        name: 'og:title',
        content: title,
      },
      {
        name: 'twitter:title',
        content: title,
      }
    ])
  }
  getTitle(): string {
    return this.titleService.getTitle();
  }
  getDescription(): string {
    const descriptionTag = this.meta.getTag('name="description"');
    return descriptionTag ? descriptionTag.content : '';
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
  addUrlMetaTag(url: string) {
    this.meta.addTag({ property: 'og:url', content: url });
    this.meta.addTag({ name: 'twitter:url', content: url });
  }
  addWebsiteMetaTag() {
    this.meta.addTag({ property: 'og:type', content: 'website' });
    this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });
  }
  addImageMetaTag(url: string) {
    this.meta.addTag({ property: 'og:image', content: url, itemprop:'image' });
    this.meta.addTag({ name: 'twitter:image', content: url });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:type', content: 'image/jpeg' });
  }

  addDescriptionMetaTag(content: string) {
    this.meta.addTag({ name: 'description', content });
    this.meta.addTag({ property: 'og:description', content });
    this.meta.addTag({ name: 'twitter:description', content: content });
  }

  addKeywordsMetaTag(keywords: string) {
    this.meta.addTag({ name: 'keywords', content: keywords });
  }

  removeAllMetaTags() {
    this.meta.removeTag("name='description'");
    this.meta.removeTag("name='keywords'");
    this.meta.removeTag("property='og:title'");
    this.meta.removeTag("property='og:description'");
    this.meta.removeTag("property='twitter:title'");
    this.meta.removeTag("property='twitter:description'");
    this.meta.removeTag('property="og:url"');
    this.meta.removeTag('name="twitter:url"');

  }
}
