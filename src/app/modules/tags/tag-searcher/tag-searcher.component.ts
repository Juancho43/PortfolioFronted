import { Component, effect, inject, OnDestroy, output, signal } from '@angular/core';
import { TagComponent } from '@modules/tags/tag/tag.component';
import { Tag } from '@model/Tag';
import { TagService } from '@http/tag.service';

import { FormsModule } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tag-searcher',
  standalone: true,
  imports: [TagComponent, FormsModule],
  templateUrl: './tag-searcher.component.html',
  styleUrls: ['../../../core/styles/searcher.css','./tag-searcher.component.css'],
})
export class TagSearcherComponent implements OnDestroy {
  private tagService = inject(TagService);
  tagSelected = output<Tag>();
  searchTerm = signal<string>('');
  tags = rxResource({
    request: () => ({
      requestTag: this.searchTerm(),
    }),
    loader: ({ request }) => {
      if (request.requestTag.length > 0) {
        return this.tagService.search(request.requestTag);
      } else {
        return this.tagService.getAll();
      }
    },
  });

  constructor() {
    effect(() => {
      this.searchTerm();
      this.tags.reload();
    });
  }

  ngOnDestroy() {
    this.tags.destroy();
  }

  selectTag(tag: Tag) {
    this.tagSelected.emit(tag);
  }
}
