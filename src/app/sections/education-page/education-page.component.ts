import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
  styleUrl: './education-page.component.scss',
})
export default class EducationPageComponent implements OnInit, OnDestroy {
  private tagService = inject(TagService);
  private metaTagService = inject(MetaTagsService);

  tagsList = rxResource({
    loader: () => this.tagService.getAllEducationTags(),
  });

  ngOnInit(): void {
    this.metaTagService.addTitle('Formación - Bravo, Juan Alé');
    this.metaTagService.addDescriptionMetaTag('Formación de Juan Alé, programador full stack. Descubre su trayectoria académica y profesional.')
  }

  ngOnDestroy(): void {
    this.metaTagService.addTitle('Bravo, Juan Alé');
    this.metaTagService.removeAllMetaTags();
  }
}
