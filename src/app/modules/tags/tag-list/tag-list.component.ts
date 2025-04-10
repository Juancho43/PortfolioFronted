import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from '@model/Tag';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [TagComponent],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.css',
})
export class TagListComponent {
  @Input() tags: Tag[] = [];
  @Input() optionList: boolean = false;
  @Output() tagSelected = new EventEmitter<number>();
  allTag: Tag = {
    id: 0,
    name: 'Todo',
  };
  onTagClick(tagId: number): void {
    this.tagSelected.emit(tagId);
  }
  onAllTagClick() {
    this.tagSelected.emit(this.allTag.id);
  }
}
