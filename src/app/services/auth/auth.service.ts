import { Injectable, inject } from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { TokenService } from '../../core/auth/token.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenService = inject(TokenService);
  private http = inject(HttpClient);

  login(email: string, password: string) {
    if (email === 'admin@email.com' && password === '123456') {
      const fakeToken = 'fake-jwt-token-123456';

      return of(fakeToken).pipe(
        delay(1000),
        tap((token) => this.tokenService.setToken(token)),
      );
    }

    return throwError(() => new Error('Credenciais inválidas'));
  }

  logout() {
    this.tokenService.removeToken();
  }

  getProfile() {
    return this.http.get('https://jsonplaceholder.typicode.com/users/1');
  }

  isAuthenticated(): boolean {
    return this.tokenService.hasToken();
  }
}
