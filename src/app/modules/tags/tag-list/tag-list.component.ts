import { Component, input } from '@angular/core';
import { Tag } from '@model/Tag';
import { TagComponent } from '../tag/tag.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [TagComponent, RouterLink],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss',
})
export class TagListComponent {
  readonly tags = input<Tag[]>([]);
  readonly optionList = input(false);

  allTag: Tag = {
    id: 0,
    name: 'Todo',
  };
}
