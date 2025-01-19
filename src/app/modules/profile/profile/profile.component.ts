import { Component, inject } from '@angular/core';
import { ProfileService } from '../../../core/services/profile.service';
import { ProfileDaoService } from '../../../core/DAO/profile-dao.service';

@Component({
  selector: 'app-profile',
  imports: [],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
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
}
