import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { TagListComponent } from '@modules/tags/tag-list/tag-list.component';
import { TagService } from '@services/http/tag.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { MetaTagsService } from '@services/utils/meta-tags.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-education-page',
  standalone: true,
  imports: [TagListComponent, RouterOutlet],
  templateUrl: './education-page.component.html',
  styleUrl: './education-page.component.css',
})
export default class EducationPageComponent implements OnInit, OnDestroy {
  private tagService = inject(TagService);
  private metaTagService = inject(MetaTagsService);

  tag = input<string>();
  tagsList = rxResource({
    loader: () => this.tagService.getAllProjectTags(),
  });

  ngOnInit(): void {
    this.setMetaTags();
  }

  ngOnDestroy(): void {
    this.metaTagService.removeAllMetaTags();
    this.metaTagService.updateTitle('Bravo, Juan Alé');
  }

  setMetaTags() {
    this.metaTagService.updateTitle('Formación');
    this.metaTagService.addMetaTags([
      { name: 'description', content: 'Formación realizada.' },
      { name: 'og:description', content: 'Formación realizada.' },
    ]);
  }


}
