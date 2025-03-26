import { Component, inject, Input } from '@angular/core';
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
  private tagsService = inject(TagService);
  @Input() tags: Tag[] = [];
  @Input() load: boolean = true;
  ngOnInit() {
    if (this.load) {
      this.getData();
    }
  }

  getData() {
    this.tagsService.getTags().subscribe({
      next: (x) => {
        this.tags = x.data!;
      },
    });
  }
}
