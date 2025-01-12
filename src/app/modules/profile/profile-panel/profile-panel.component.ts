import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { ProfileFormComponent } from '../profile-form/profile-form.component';

@Component({
  selector: 'app-profile-panel',
  imports: [ProfileComponent, ProfileFormComponent],
  standalone: true,
  templateUrl: './profile-panel.component.html',
  styleUrl: './profile-panel.component.css',
})
export class ProfilePanelComponent {}
