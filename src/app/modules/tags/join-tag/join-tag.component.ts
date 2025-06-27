import { Component, effect, input, output, signal } from '@angular/core';
import { Tag } from '@model/Tag';
import { TagComponent } from '@modules/tags/tag/tag.component';
import { TagSearcherComponent } from '@modules/tags/tag-searcher/tag-searcher.component';
import { TagMiniFormComponent } from '@modules/tags/tag-mini-form/tag-mini-form.component';

@Component({
  selector: 'app-join-tag',
  standalone: true,
  imports: [TagComponent, TagSearcherComponent, TagMiniFormComponent],
  templateUrl: './join-tag.component.html',
  styleUrls: ['../../../core/styles/join.css', '../../../core/styles/forms.css', './join-tag.component.css'],
})
export class JoinTagComponent {
  readonly initialTags = input.required<Tag[]>();

  currentTags = signal<Tag[]>([]);
  selectedTag = signal<Tag>({} as Tag);
  finalTags = output<Tag[]>();

  show = signal<boolean>(false);
  showForm = signal<boolean>(false);
  showSearch = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.initialTags();
      this.currentTags.set(this.initialTags());
    });
  }

  toggleShow() {
    this.show.set(!this.show());
  }
  toggleShowForm() {
    this.showForm.set(!this.showForm());
    if (this.showForm()) this.showSearch.set(false);
  }
  toggleShowSearch() {
    this.showSearch.set(!this.showSearch());
    if (this.showSearch()) this.showForm.set(false);
  }

  reset() {
    this.currentTags.set([]);
  }
  editTag(tag: Tag) {
    this.selectedTag.set(tag);
  }
  handleClearForm() {
    this.selectedTag.set({} as Tag);
  }

  addTag(tag: Tag) {
    if (!this.currentTags().some((t) => t.id === tag.id)) {
      const updatedTags = [...this.currentTags(), tag];
      this.currentTags.set(updatedTags);
      this.finalTags.emit(updatedTags);
    }
  }

  updateTag(tag: Tag) {
    const updatedTags = this.currentTags().map((t) => (t.id === tag.id ? tag : t));
    this.currentTags.set(updatedTags);
    this.finalTags.emit(updatedTags);
  }

  removeTag(tag: Tag) {
    const updatedTags = this.currentTags().filter((t) => t.id !== tag.id);
    this.currentTags.set(updatedTags);
    this.finalTags.emit(updatedTags);
  }
}
