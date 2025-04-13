import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileService } from '@services/http/profile.service';
import { ProfileDaoService } from '@dao/profile-dao.service';
import { Profile } from '@model/Profile';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-profile',
  imports: [],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private profileService = inject(ProfileService);
  private profileDao = inject(ProfileDaoService);

  profile?: Profile;
  photo = signal<string>('');

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.profileService.getProfile(1).subscribe((profile) => {
      this.profileDao.setProfile(profile.data!);
      this.profile = profile.data;
      this.photo.set(
        environment.public_url +
          profile.data!.links?.find((link) => link.name == 'photo_url')?.link,
      );
    });
  }
}
