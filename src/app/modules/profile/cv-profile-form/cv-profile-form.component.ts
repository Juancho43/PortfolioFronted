import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '@services/http/profile.service';

@Component({
  selector: 'app-cv-profile-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cv-profile-form.component.html',
  styleUrl : './cv-profile-form.component.scss',
})
export class CvProfileFormComponent {
  private service = inject(ProfileService);
  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('cv', this.selectedFile);
      this.service.postCv(formData, 1).subscribe();
    }
  }
}
