import { Component, inject } from '@angular/core';
import { ProfileService } from '@services/http/profile.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-img-profile-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './img-profile-form.component.html',
  styleUrl: './img-profile-form.component.scss',
})
export class ImgProfileFormComponent {
  private service = inject(ProfileService);
  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('photo_url', this.selectedFile, this.selectedFile.name);
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      this.service.postImg(formData, 1).subscribe();
    }
  }
}
