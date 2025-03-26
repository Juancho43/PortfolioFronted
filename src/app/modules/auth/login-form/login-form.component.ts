import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/utils/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css', '../../../core/styles/forms.css'],
})
export class LoginFormComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      let email = this.loginForm.get('email')?.value!;
      let password = this.loginForm.get('password')?.value!;
      this.authService.sendLogin({ email, password }).subscribe((res: any) => {
        if (res.message == 'Hi') {
          this.authService.saveToken(res.accessToken);
          this.authService.login = true;
          this.router.navigateByUrl('/admin/profile');
          alert('Welcome');
        } else {
          alert('Login failed');
        }
      });
    }
  }
}
