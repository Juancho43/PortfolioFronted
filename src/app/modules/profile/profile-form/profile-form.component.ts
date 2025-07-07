import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProfileService } from '@services/http/profile.service';
import { Profile } from '@model/Profile';
import { ImgProfileFormComponent } from '@modules/profile/img-profile-form/img-profile-form.component';
import { CvProfileFormComponent } from '@modules/profile/cv-profile-form/cv-profile-form.component';
import { JoinLinkComponent } from '@modules/links/join-link/join-link.component';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule, ImgProfileFormComponent, CvProfileFormComponent, JoinLinkComponent],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss',
})
export class ProfileFormComponent implements OnInit {
  private service = inject(ProfileService);
  edit = signal<boolean>(true);

  readonly currentProfile = input<Profile>({} as Profile);
  ProfileForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    presentation: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    const currentProfile = this.currentProfile();
    if (currentProfile.id != 0) {
      this.ProfileForm.patchValue({
        id: currentProfile?.id,
        name: currentProfile.name,
        role: currentProfile.rol,
        presentation: currentProfile.description,
      });
    }
  }

  clean() {
    this.ProfileForm.reset();
    this.edit.set(false);
  }

  mapperProfile(): Profile {
    return {
      id: this.currentProfile().id,
      name: this.ProfileForm.get('name')?.value ?? '',
      description: this.ProfileForm.get('presentation')?.value ?? '',
      rol: this.ProfileForm.get('role')?.value ?? '',
    };
  }
  onSubmit() {
    if (this.edit()) {
      this.service.putProfile(this.mapperProfile()).subscribe();
    }
  }
}
