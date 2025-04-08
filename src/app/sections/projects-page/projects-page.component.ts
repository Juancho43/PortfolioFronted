import { Component, inject, signal } from '@angular/core';
import { ProjectListComponent } from '@modules/projects/project-list/project-list.component';
import { TagListComponent } from '@modules/tags/tag-list/tag-list.component';
import { ProjectService } from '@services/project.service';
import { TagService } from '@services/tag.service';
import { Tag } from '@model/Tag';
import { Project } from '@model/Project';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [ProjectListComponent, TagListComponent],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css',
})
export class ProjectsPageComponent {
  private projectService = inject(ProjectService);
  private tagService = inject(TagService);

  projectsList = signal<Project[]>([]);
  tagsList = signal<Tag[]>([]);
  selectedTagId = signal<number | null>(null);

  constructor() {
    const selectedTagObservable = toObservable(this.selectedTagId);
    selectedTagObservable.subscribe((tagId) => {
      if (tagId !== null) {
        this.getProjectsByTagId(tagId);
      }
    });
  }

  ngOnInit(): void {
    this.getTags();
    this.getProjects();

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
