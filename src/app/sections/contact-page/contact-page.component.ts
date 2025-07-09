import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ContactComponent } from '@modules/contact/contact.component';
import { environment } from '@environments/environment';
import { ProfileService } from '@services/http/profile.service';
import { MetaTagsService } from '@services/utils/meta-tags.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ContactComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
})
export default class ContactPageComponent implements OnInit, OnDestroy {
  protected readonly environment = environment;
  private service = inject(ProfileService);
  private metaTagService = inject(MetaTagsService);
  linkedin = signal<string>('');
  mail = signal<string>('');
  github = signal<string>('');
  cv = signal<string>('');
  platzi = signal<string>('');
  ngOnInit(): void {
    this.getData();
    this.metaTagService.addTitle('Contacto - Bravo, Juan Alé');
    this.metaTagService.addDescriptionMetaTag('Enlaces de contacto de Juan Alé, programador full stack. Conectá conmigo a través de LinkedIn, GitHub, correo electrónico o mi CV.')
  }


  ngOnDestroy(): void {
    this.metaTagService.removeAllMetaTags();
    this.metaTagService.addTitle('Bravo, Juan Alé');
  }

  getData() {
    this.service.getProfile(1).subscribe((res) => {
      if (res.data && res.data.links) {
        this.linkedin.set(res.data.links.find((link) => link.name === 'linkedin')?.link || '');
        this.mail.set(res.data.links.find((link) => link.name === 'mail')?.link || '');
        this.github.set(res.data.links.find((link) => link.name === 'github')?.link || '');
        this.cv.set(res.data.links.find((link) => link.name === 'cv')?.link || '');
        this.platzi.set(res.data.links.find((link) => link.name === 'Perfil')?.link || '');
      }
    });
  }
}
