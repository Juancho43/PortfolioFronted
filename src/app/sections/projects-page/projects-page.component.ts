import { Component, inject, signal } from '@angular/core';
import { ProjectListComponent } from '@modules/projects/project-list/project-list.component';
import { TagListComponent } from '@modules/tags/tag-list/tag-list.component';
import { ProjectService } from '@services/http/project.service';
import { TagService } from '@services/http/tag.service';
import { Tag } from '@model/Tag';
import { Project } from '@model/Project';
import { toObservable } from '@angular/core/rxjs-interop';
import { MetaTagsService } from '@services/utils/meta-tags.service';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [ProjectListComponent, TagListComponent, RouterOutlet],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css',
})
export class ProjectsPageComponent {
  private projectService = inject(ProjectService);
  private tagService = inject(TagService);
  private metaTagService = inject(MetaTagsService);
  projectsList = signal<Project[]>([]);
  tagsList = signal<Tag[]>([]);
  selectedTagId = signal<number | null>(null);

  constructor() {
    const selectedTagObservable = toObservable(this.selectedTagId);
    selectedTagObservable.subscribe((tagId) => {
      if (tagId !== null) {
        if (tagId === 0) {
          this.getProjects();
        } else {
          this.getProjectsByTagId(tagId);
        }
      }
    });
  }

  ngOnInit(): void {
    this.getTags();
    this.getProjects();
    this.setMetaTags();
  }

  ngOnDestroy(): void {
    this.metaTagService.removeAllMetaTags();
    this.metaTagService.updateTitle('Bravo, Juan Alé');
  }

  setMetaTags() {
    this.metaTagService.updateTitle('Proyectos');
    this.metaTagService.addMetaTags([
      { name: 'description', content: 'Proyectos realizados.' },
      { name: 'og:description', content: 'Proyectos realizados.' },
    ]);
  }

  getProjects(): void {
    this.projectService.getAll().subscribe((res) => {
      this.projectsList.set(res.data!);
    });
  }

  getProjectsByTagId(id: number) {
    this.projectService.getByTag(id).subscribe((res) => {
      this.projectsList.set(res.data!);
    });
  }

  getTags(): void {
    this.tagService.getAllProjectTags().subscribe((res) => {
      this.tagsList.set(res.data!);
    });
  }

  handleTagSelected(tagId: number): void {
    this.selectedTagId.set(tagId);
  }
}
