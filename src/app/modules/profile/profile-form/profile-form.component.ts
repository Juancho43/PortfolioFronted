import { Component, inject, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProyectsService } from '../../../core/services/proyects.service';
import { Proyecto } from '../../../core/interfaces/Proyecto';
import { ProfileService } from '../../../core/services/profile.service';
import { Profile } from '../../../core/interfaces/Profile';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css', '../../../core/styles/forms.css'],
})
export class ProfileFormComponent {
  private service = inject(ProfileService);

  edit: boolean = true;
  @Input() currentProfile: any = {
    id: 0,
    description: '',
    rol: '',
    publicMail: '',
    linkedin: '',
    github: '',
  };
  ProfileForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    nombre: new FormControl('', [Validators.required]),
    presentacion: new FormControl('', [Validators.required]),
    rol: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.ProfileForm.patchValue({
      id: this.currentProfile.id,
      nombre: this.currentProfile.name,
      rol: this.currentProfile.rol,
      presentacion: this.currentProfile.presentacion,
    });
  }

  onSubmit() {
    this.mapperProyecto();
    if (this.edit) {
      this.service.putProfile(this.currentProfile).subscribe();
    }
  }
  mapperProyecto() {
    this.currentProfile.id = this.ProfileForm.get('id')?.value;
    // this.currentProfile. = this.ProfileForm.get("nombre")?.value;
    this.currentProfile.description =
      this.ProfileForm.get('presentacion')?.value;
    this.currentProfile.rol = this.ProfileForm.get('rol')?.value;
  }
}
