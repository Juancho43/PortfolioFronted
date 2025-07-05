import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileService } from '@services/http/profile.service';
import { Profile } from '@model/Profile';
import { environment } from '@environments/environment';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [NgOptimizedImage],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private profileService = inject(ProfileService);
  profile?: Profile;
  photo = signal<string>('null');

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.profileService.getProfile(1).subscribe((profile) => {
      this.profile = profile.data;
      this.photo.set(environment.public_url + profile.data!.links?.find((link) => link.name == 'photo_url')?.link);
    });
  }
}
