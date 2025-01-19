import { Component, inject } from '@angular/core';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { DataTableComponent } from '../../../core/shared/data-table/data-table.component';
import { ProfileService } from '../../../core/services/profile.service';
import { TableData } from '../../../core/interfaces/TableData';
import { ProfileDaoService } from '../../../core/DAO/profile-dao.service';

@Component({
  selector: 'app-profile-panel',
  imports: [ProfileFormComponent, DataTableComponent],
  standalone: true,
  templateUrl: './profile-panel.component.html',
  styleUrls: [
    './profile-panel.component.css',
    '../../../core/styles/panel.css',
  ],
})
export class ProfilePanelComponent {
  private service = inject(ProfileService);
  private dao = inject(ProfileDaoService);
  tilte: string = 'Usuario';
  colums: string[] = [];
  data: TableData[] = [];

  profileColumns: string[] = [];
  profileData: TableData[] = [];
  profileTilte: string = 'Perfil';
  profile: any;

  ngOnInit() {
    this.service.getProfile(1).subscribe((res) => {
      Object.keys(res.Profile).forEach((key) => {
        this.colums.push(key);
      });

      Object.keys(res.Profile.profile).forEach((value) => {
        this.profileColumns.push(value);
      });

      this.data.push(res.Profile);
      this.profileData.push(res.Profile.profile);

      this.dao.setProfile(res.Profile);
    });
  }

  handleEdit() {
    this.dao.getProfile().subscribe((res) => {
      this.profile = res;
    });
  }
}
