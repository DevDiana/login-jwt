import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;

  loginError: string | null = null;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
  });

  private errorMessages: Record<string, Record<string, string>> = {
    // passar para uma pasta no shared
    email: {
      required: 'O campo email é obrigatório.',
      email: 'O email deve ser válido.',
    },
    password: {
      required: 'O campo senha é obrigatório.',
      minlength: 'A senha deve conter no mínimo 6 caracteres.',
      maxlength: 'A senha deve conter no máximo 12 caracteres.',
    },
  };

  getErrorMessage(controlName: 'email' | 'password'): string | null {
    const control = this.loginForm.get(controlName);

    if (!control || !control.touched || !control.errors) {
      return null;
    }

    const firstErrorKey = Object.keys(control.errors)[0];

    return this.errorMessages[controlName][firstErrorKey] ?? null;
  }

  private isFormValid(): boolean {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return false;
    }
    return true;
  }

  private prepareForSubmit(): void {
    this.isLoading = true;
    this.loginError = null;
  }

  private getFormValue() {
    return this.loginForm.value;
  }

  private executeLogin(email: string, password: string): void {
    this.authService.login(email, password).subscribe({
      next: () => this.handleSuccess(),
      error: (error) => this.handleError(error),
      complete: () => this.finishSubmit(),
    });
  }

  private handleError(error: any): void {
    this.loginError = error.message;
  }

  private finishSubmit(): void {
    this.isLoading = false;
  }

  private handleSuccess(): void {
    this.router.navigate(['/dashboard']);
  }

  onSubmit(): void {
    if (!this.isFormValid()) return;

    this.prepareForSubmit();

    const { email, password } = this.getFormValue();

    this.executeLogin(email!, password!);
  }
}
