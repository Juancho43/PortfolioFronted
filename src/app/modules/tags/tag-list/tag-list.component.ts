import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Tag } from '../../../core/interfaces/Tag';
import { TagService } from '../../../core/services/tag.service';
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

  @Output() tagSelected = new EventEmitter<number>();

  onTagClick(tagId: number): void {
    this.tagSelected.emit(tagId);
  }
}
