import { Component } from '@angular/core';
import { TagFormComponent } from '../tag-form/tag-form.component';
import { TagListComponent } from '../tag-list/tag-list.component';

@Component({
  selector: 'app-tags-panel',
  imports: [TagFormComponent, TagListComponent],
  standalone: true,
  templateUrl: './tags-panel.component.html',
  styleUrl: './tags-panel.component.css',
})
export class TagsPanelComponent {}
