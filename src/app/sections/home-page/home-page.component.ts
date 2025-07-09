import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MetaTagsService } from '@services/utils/meta-tags.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export default class HomePageComponent implements OnInit, OnDestroy {
  private metaTagService = inject(MetaTagsService);

  ngOnInit(): void {
    this.metaTagService.addTitle('Acerca de: Bravo, Juan Alé');
    this.metaTagService.addDescriptionMetaTag('Porfolio de Juan Alé, programador full stack. Descubre sus proyectos, habilidades y trayectoria profesional.')

  }

  ngOnDestroy(): void {
    this.metaTagService.addTitle('Bravo, Juan Alé');
    this.metaTagService.removeAllMetaTags();
  }
}
