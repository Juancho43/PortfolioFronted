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
  styleUrl: './tag-searcher.component.scss',
})
export class TagSearcherComponent implements OnDestroy {
  private tagService = inject(TagService);
  tagSelected = output<Tag>();
  searchTerm = signal<string>('');
  tags = rxResource({
    params: () => ({
      requestTag: this.searchTerm(),
    }),
    stream: ({ params }) => {
      if (params.requestTag.length > 0) {
        return this.tagService.search(params.requestTag);
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
