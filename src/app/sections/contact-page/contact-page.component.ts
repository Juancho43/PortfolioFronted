import { Component, inject } from '@angular/core';
import { ContactComponent } from '../../modules/contact/contact.component';
import { ProfileDaoService } from '../../core/DAO/profile-dao.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ContactComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
})
export class ContactPageComponent {
  private dao = inject(ProfileDaoService);
  profile: any;

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dao.getProfile().subscribe((res) => {
      this.profile = res;
    });
  }

  protected readonly environment = environment;
}
