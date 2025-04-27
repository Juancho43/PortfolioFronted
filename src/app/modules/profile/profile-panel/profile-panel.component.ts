import { Component, inject, OnInit } from '@angular/core';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { DataTableComponent } from '../../../core/shared/data-table/data-table.component';
import { ProfileService } from '@services/http/profile.service';
import { TableData } from '../../../core/interfaces/TableData';
import { ProfileDaoService } from '../../../core/services/DAO/profile-dao.service';
import { ImgProfileFormComponent } from '../img-profile-form/img-profile-form.component';
import { CvProfileFormComponent } from '../cv-profile-form/cv-profile-form.component';

@Component({
  selector: 'app-profile-panel',
  imports: [
    ProfileFormComponent,
    DataTableComponent,
    ImgProfileFormComponent,
    CvProfileFormComponent,
  ],
  standalone: true,
  templateUrl: './profile-panel.component.html',
  styleUrls: [
    './profile-panel.component.css',
    '../../../core/styles/panel.css',
  ],
})
export default class ProfilePanelComponent implements OnInit {
  private service = inject(ProfileService);
  private dao = inject(ProfileDaoService);
  tilte = 'Usuario';
  colums: string[] = [];
  data: TableData[] = [];

  profileColumns: string[] = [];
  profileData: TableData[] = [];
  profileTilte = 'Perfil';
  profileLinkColumns: string[] = [];
  profileLinkData: TableData[] = [];
  profileLinkTilte = 'Links';
  profile: any;

  ngOnInit() {
    this.service.getProfile(1).subscribe((res) => {
      Object.keys(res.data!).forEach((value) => {
        if (value !== 'links') {
          this.profileColumns.push(value);
        }
      });

      this.profileData.push(res.data!);

      Object.keys(res.data!.links![0]).forEach((value) => {
        this.profileLinkColumns.push(value);
      });
      res.data!.links!.forEach((link: any) => {
        this.profileLinkData.push(link);
      });

      this.dao.setProfile(res.data!);
    });
  }

  handleEdit() {
    this.dao.getProfile().subscribe((res) => {
      this.profile = res;
    });
  }
}
