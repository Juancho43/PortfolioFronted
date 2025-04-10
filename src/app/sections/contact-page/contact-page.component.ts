import { Component, inject, signal } from '@angular/core';
import { ContactComponent } from '../../modules/contact/contact.component';
import { ProfileDaoService } from '../../core/services/DAO/profile-dao.service';
import { environment } from '../../../environments/environment';
import { Profile } from '../../core/interfaces/Profile';
import { ProfileService } from '@services/http/profile.service';
import { lastValueFrom } from 'rxjs';
import {MetaTagsService} from '@services/utils/meta-tags.service';
@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ContactComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
})
export class ContactPageComponent {
  protected readonly environment = environment;
  private dao = inject(ProfileDaoService);
  private service = inject(ProfileService);
  private metaTagService = inject(MetaTagsService);
  linkedin = signal<string>('');
  mail = signal<string>('');
  github = signal<string>('');
  cv = signal<string>('');

  ngOnInit() {
    this.getData();
    this.setMetaTags();
  }
  ngOnDestroy(): void {
    this.metaTagService.removeAllMetaTags();
    this.metaTagService.updateTitle('Bravo, Juan Alé');
  }

  setMetaTags() {
    this.metaTagService.updateTitle('Contactame');
    this.metaTagService.addMetaTags([
      { name: 'description', content: 'Contactarme.' },
      { name: 'og:description', content: 'Contactarme.' },
    ]);
  }
  getData() {
    this.service.getProfile(1).subscribe((res) => {
      if (res.data && res.data.links) {
        console.log(res.data.links);
        this.linkedin.set(
          res.data.links.find((link) => link.name === 'linkedin')?.link || '',
        );
        this.mail.set(
          res.data.links.find((link) => link.name === 'mail')?.link || '',
        );
        this.github.set(
          res.data.links.find((link) => link.name === 'github')?.link || '',
        );
        this.cv.set(
          res.data.links.find((link) => link.name === 'cv')?.link || '',
        );
      }
    });
  }
}
