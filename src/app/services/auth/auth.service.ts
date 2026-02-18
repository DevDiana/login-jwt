import { Injectable, inject } from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { TokenService } from '../../core/auth/token.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenService = inject(TokenService);
  private http = inject(HttpClient);
  private readonly router = inject(Router);

  login(email: string, password: string) {
    if (email === 'admin@email.com' && password === '123456@') {
      const fakeToken = 'fake-jwt-token-123456@';
      return of(fakeToken).pipe(
        delay(1000),
        tap((token) => {
          this.tokenService.setToken(token);
          localStorage.setItem('user_email', email);
          console.log('Salvando no storage:', email);
        }),
      );
    }
    return throwError(() => new Error('Credenciais inválidas'));
  }

  logout() {
    this.tokenService.removeToken();
    localStorage.removeItem('user_email');
    this.router.navigate(['/']);
  }

  getUserEmail(): string {
    return localStorage.getItem('user_email') ?? '';
  }

  getProfile() {
    return this.http.get('https://jsonplaceholder.typicode.com/users/1');
  }

  isAuthenticated(): boolean {
    return this.tokenService.hasToken();
  }
}
