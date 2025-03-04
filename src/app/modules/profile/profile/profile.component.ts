import { Component, inject } from '@angular/core';
import { ProfileService } from '../../../core/services/profile.service';
import { ProfileDaoService } from '../../../core/DAO/profile-dao.service';
import { environment } from '../../../../environments/environment';
import { Profile } from '../../../core/interfaces/Profile';

@Component({
  selector: 'app-profile',
  imports: [],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private profileService = inject(ProfileService);
  private profileDao = inject(ProfileDaoService);
  profile?: Profile ;
  photo: string = '';
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.profileService.getProfile(1).subscribe((profile) => {
      this.profileDao.setProfile(profile.data);
      this.profile = profile.data;
      this.photo = environment.public_url + profile.data?.links[3].link;
    });
  }
}
