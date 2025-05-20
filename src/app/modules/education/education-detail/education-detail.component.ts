import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MetaTagsService } from '@services/utils/meta-tags.service';
import { Tag } from '@model/Tag';
import { EducationService } from '@http/education.service';
import { Education } from '@model/Education';
import { LinkComponent } from '@modules/links/link/link.component';
import { TagComponent } from '@modules/tags/tag/tag.component';
import ProjectListComponent from '@modules/projects/project-list/project-list.component';

@Component({
  selector: 'app-education-detail',
  standalone: true,
  imports: [LinkComponent, TagComponent, ProjectListComponent],
  templateUrl: './education-detail.component.html',
  styleUrl: './education-detail.component.css',
})
export default class EducationDetailComponent {
  private router = inject(Router);
  private meta = inject(MetaTagsService);
  private service = inject(EducationService);

  readonly slug = input<string>('');
  readonly currentEducation = input<Education>({} as Education);
  education = signal<Education>({} as Education);

  ngOnInit(): void {
    if (this.slug() != '') {
      this.getData(this.slug());
      this.setMetaTags();
    } else {
      this.education.set(this.currentEducation());
    }
  }

  ngOnDestroy(): void {
    this.meta.updateTitle('Bravo, Juan Alé');
    this.meta.removeAllMetaTags();
  }

  setMetaTags() {
    const project = this.education;
    this.meta.updateTitle(`Formacion - ${project.name}`);
    this.meta.addMetaTags([
      {
        name: project.name,
        content: project.name,
      },
      {
        name: 'description',
        content: project().description,
      },
      {
        name: 'keywords',
        content: project()
          .tags!.map((tag: Tag) => tag.name)
          .join(','),
      },
    ]);
  }

  getData(slug: string) {
    this.service.getBySlug(slug).subscribe({
      next: (data) => {
        this.education.set(data.data!);
        this.setMetaTags();
      },
      error: () => {
        this.router.navigateByUrl('./not-found');
      },
    });
  }
}
