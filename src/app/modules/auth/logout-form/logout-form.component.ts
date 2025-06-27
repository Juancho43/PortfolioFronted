import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@services/utils/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-logout-form',
  imports: [ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './logout-form.component.html',
  styleUrls: ['../../../core/styles/forms.css', './logout-form.component.css'],
})
export default class LogoutFormComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  logoutForm = new FormGroup({
    confirmation: new FormControl(false, [Validators.required]),
  });

  logout() {
    if (this.logoutForm.get('confirmation')?.value) {
      this.authService.sendLogout().subscribe((res) => {
        if (res.message == 'Bye') {
          this.router.navigateByUrl('/home');
        }
      });
    }
  }
}
