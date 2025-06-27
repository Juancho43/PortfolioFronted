import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@services/utils/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrls: ['../../../core/styles/forms.css', './login-form.component.css'],
})
export default class LoginFormComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  ngOnInit() {
    if (this.authService.$login()) {
      this.router.navigateByUrl('/admin/profile');
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value ?? '';
      const password = this.loginForm.get('password')?.value ?? '';
      this.authService.sendLogin({ email, password }).subscribe((res) => {
        if (res.message == 'Hi') {
          this.router.navigateByUrl('/admin/profile');
        } else {
          alert('Login failed');
        }
      });
    }
  }
}
