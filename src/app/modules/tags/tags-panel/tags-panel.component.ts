import { Component, inject, signal } from '@angular/core';
import { TagService } from '@services/http/tag.service';
import { Tag } from '@model/Tag';
import { TagComponent } from '@modules/tags/tag/tag.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { TagFormComponent } from '@modules/tags/tag-form/tag-form.component';


@Component({
  selector: 'app-tags-panel',
  imports: [TagFormComponent, TagComponent],
  standalone: true,
  templateUrl: './tags-panel.component.html',
  styleUrls: [ '../../../core/styles/panel.css', './tags-panel.component.css' ],
})
export default class TagsPanelComponent {
  private service = inject(TagService);
  currentTag = signal<Tag>({} as Tag);
  tagsResource = rxResource({
    loader: () => {
      return this.service.getAll();
    },
  });

  selectHandler(tag: Tag) {
    this.currentTag.set(tag);
  }

  handleClearForm() {
    this.currentTag.set({} as Tag);
    this.tagsResource.reload();
  }
}
