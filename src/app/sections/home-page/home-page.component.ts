import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MetaTagsService } from '@services/utils/meta-tags.service';
import  { ContactPageComponent } from '@app/sections/contact-page/contact-page.component';
import { EducationListComponent } from '@modules/education/education-list/education-list.component';
import  { ProjectListComponent } from '@modules/projects/project-list/project-list.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ContactPageComponent,
    EducationListComponent,
    ProjectListComponent,
    ProjectListComponent,
    ProjectListComponent,
    ContactPageComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export default class HomePageComponent implements OnInit, OnDestroy {
  private metaTagService = inject(MetaTagsService);

  ngOnInit(): void {
    this.metaTagService.addTitle('Bravo, Juan Alé');
    this.metaTagService.addDescriptionMetaTag(
      'Porfolio de Juan Alé, programador full stack. Descubre sus proyectos, habilidades y trayectoria profesional.',
    );
  }

  ngOnDestroy(): void {
    this.metaTagService.addTitle('Bravo, Juan Alé');
    this.metaTagService.removeAllMetaTags();
  }
}
