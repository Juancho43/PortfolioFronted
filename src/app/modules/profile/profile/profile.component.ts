import { Component, inject } from '@angular/core';
import { ProfileService } from '@services/http/profile.service';
import { ProfileDaoService } from '@dao/profile-dao.service';
import { Profile } from '@model/Profile';

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

  profile?: Profile;
  photo: string = '';
  ngOnInit() {
    this.getData();
  }

  ngOnDestroy() {}

  getData() {
    this.profileService.getProfile(1).subscribe((profile) => {
      this.profileDao.setProfile(profile.data);
      this.profile = profile.data;
      // this.photo = environment.public_url + profile.data?.links.find(link => link.name == 'photo_url')?.link;
    });
  }
}
