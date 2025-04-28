import { Component, inject, OnInit, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Project } from '../../../core/interfaces/Project';
import { ProfileService } from '@services/http/profile.service';
import { Profile } from '../../../core/interfaces/Profile';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css', '../../../core/styles/forms.css'],
})
export class ProfileFormComponent implements OnInit {
  private service = inject(ProfileService);

  edit = true;
  readonly currentProfile = input<Profile>({
    id: 0,
    description: '',
    rol: '',
    links: [],
    name: '',
  });
  ProfileForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    nombre: new FormControl('', [Validators.required]),
    presentacion: new FormControl('', [Validators.required]),
    rol: new FormControl('', [Validators.required]),
  });

  ngOnInit() {}

  setForm() {
    const currentProfile = this.currentProfile();
    if (currentProfile.id != 0) {
      this.ProfileForm.patchValue({
        id: currentProfile?.id,
        nombre: currentProfile.name,
        rol: currentProfile.rol,
        presentacion: currentProfile.description,
      });
    }
  }

  onSubmit() {
    this.mapperProyecto();
    if (this.edit) {
      this.service.putProfile(this.currentProfile()).subscribe();
    }
  }
  mapperProyecto() {
    const currentProfile = this.currentProfile();
    currentProfile.id = this.ProfileForm.get('id')?.value;
    // this.currentProfile. = this.ProfileForm.get("nombre")?.value;
    currentProfile.description = this.ProfileForm.get('presentacion')?.value;
    currentProfile.rol = this.ProfileForm.get('rol')?.value;
  }
}
