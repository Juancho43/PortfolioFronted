import { Component, effect, inject, input, output, signal } from '@angular/core';
import { Tag } from '@model/Tag';
import { TagService } from '@http/tag.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { TagComponent } from '@modules/tags/tag/tag.component';
import { TagSearcherComponent } from '@modules/tags/tag-searcher/tag-searcher.component';

@Component({
  selector: 'app-join-tag',
  standalone: true,
  imports: [TagComponent, TagSearcherComponent],
  templateUrl: './join-tag.component.html',
  styleUrl: './join-tag.component.css',
})
export class JoinTagComponent {
  private service = inject(TagService);
  readonly initialTags = input<Tag[]>();
  tagsResource = rxResource({
    loader: () => {
      return this.service.getAll();
    },
  });
  currentTags = signal<Tag[]>([]);
  finalTags = output<Tag[]>();

  show = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.initialTags();
      this.currentTags.set(this.initialTags()!);
    });
  }

  toggleShow() {
    this.show.set(!this.show());
  }

  reset() {
    this.currentTags.set([]);
  }

  removeTag(tag: Tag) {
    const updatedTags = this.currentTags().filter((t) => t.id !== tag.id);
    this.currentTags.set(updatedTags);
    this.finalTags.emit(updatedTags);
  }

  addTag(tag: Tag) {
    if (!this.currentTags().some((t) => t.id === tag.id)) {
      const updatedTags = [...this.currentTags(), tag];
      this.currentTags.set(updatedTags);
      this.finalTags.emit(updatedTags);
    }
  }
}
