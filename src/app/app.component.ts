import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@modules/shared/header/header.component';
import { NavbarComponent } from '@modules/shared/navbar/navbar.component';
import { FooterComponent } from '@modules/shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@services/utils/theme.service';
import { SpinnerComponent } from '@modules/shared/spinner/spinner.component';
import { UpButtonComponent } from '@modules/shared/up-button/up-button.component';
import { ShareButtonComponent } from '@modules/shared/share-button/share-button.component';
import { CanonicalUrlService } from '@services/utils/canonical-url.service';
import { MetaTagsService } from '@services/utils/meta-tags.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    SpinnerComponent,
    UpButtonComponent,
    ShareButtonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);
  private canonicalUrl = inject(CanonicalUrlService);
  private metaService = inject(MetaTagsService);
  ngOnInit(): void {
    this.themeService.loadTheme();
    this.canonicalUrl.setCanonicalLink();
    this.metaService.addImageMetaTag(environment.base_url +'/images/ogimage.jpeg');
    this.metaService.addWebsiteMetaTag();
    this.metaService.addMetaTags([ {
      name: 'og:site_name',
      content: 'Juan Alé Bravo',
    },
      {
        name: 'twitter:site',
        content: '@juanalebravo',
      }
    ])
  }
}
