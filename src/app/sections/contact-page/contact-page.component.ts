import { Component, inject } from '@angular/core';
import { ContactComponent } from '../../modules/contact/contact.component';
import { ProfileDaoService } from '../../core/DAO/profile-dao.service';
import { environment } from '../../../environments/environment';
import { Profile } from '../../core/interfaces/Profile';
import { ProfileService } from '../../core/services/profile.service';
import { lastValueFrom } from 'rxjs';
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
  linkedin: string = '';
  mail: string = '';
  github: string = '';
  cv: string = '';
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getProfile(1).subscribe((res) => {
      // this.linkedin = res.data!.links.find(link => link.name === 'linkedin')?.link!;
      // this.mail = res.data!.links.find(link => link.name === 'mail')?.link!
      // this.github = res.data!.links.find(link => link.name === 'github')?.link!
      // this.cv = res.data!.links.find(link => link.name === 'cv')?.link!
    });
  }
}
