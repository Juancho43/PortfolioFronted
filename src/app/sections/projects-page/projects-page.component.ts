import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TagListComponent } from '@modules/tags/tag-list/tag-list.component';
import { TagService } from '@services/http/tag.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { MetaTagsService } from '@services/utils/meta-tags.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [TagListComponent, RouterOutlet],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss',
})
export default class ProjectsPageComponent implements OnInit, OnDestroy {
  private tagService = inject(TagService);
  private metaTagService = inject(MetaTagsService);

  tagsList = rxResource({
    loader: () => this.tagService.getAllProjectTags(),
  });

  ngOnInit(): void {
    this.metaTagService.updateTitle('Proyectos - Bravo, Juan Alé');
  }

  ngOnDestroy(): void {
    this.metaTagService.removeAllMetaTags();
    this.metaTagService.updateTitle('Bravo, Juan Alé');
  }
}
