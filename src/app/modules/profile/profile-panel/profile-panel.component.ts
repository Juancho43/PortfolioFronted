import { Component, inject } from '@angular/core';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { ProfileService } from '@services/http/profile.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-panel',
  imports: [ProfileFormComponent],
  standalone: true,
  templateUrl: './profile-panel.component.html',
  styleUrls: [ '../../../core/styles/panel.css','./profile-panel.component.css'],
})
export default class ProfilePanelComponent {
  private service = inject(ProfileService);

  profileResource = rxResource({
    loader: () => {
      return this.service.getProfile(1);
    },
  });
}
