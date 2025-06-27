import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@services/utils/auth.service';

@Component({
  selector: 'app-password-reset-form',
  imports: [FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['../../../core/styles/forms.css', './password-reset-form.component.css'],
})
export default class PasswordResetFormComponent {
  private service = inject(AuthService);

  newPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  onSubmit() {
    if (this.newPasswordForm.invalid) {
      return;
    }
    const password = this.newPasswordForm.value.confirmPassword as unknown as string;
    this.service.sendPasswordReset({ new_password: password }).subscribe();
  }
}
