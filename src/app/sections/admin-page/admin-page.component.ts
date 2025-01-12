import { Component } from '@angular/core';
import { ProyectFormComponent } from '../../modules/proyects/proyect-form/proyect-form.component';
import { TagFormComponent } from '../../modules/tags/tag-form/tag-form.component';
import { EducationFormComponent } from '../../modules/education/education-form/education-form.component';
import { ProfileFormComponent } from '../../modules/profile/profile-form/profile-form.component';
import { ProfilePanelComponent } from '../../modules/profile/profile-panel/profile-panel.component';
import { EducationPanelComponent } from '../../modules/education/education-panel/education-panel.component';
import { ProjectPanelComponent } from '../../modules/proyects/project-panel/project-panel.component';
import { TagsPanelComponent } from '../../modules/tags/tags-panel/tags-panel.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css', '../../core/styles/navbar.css'],
})
export class AdminPageComponent {}
