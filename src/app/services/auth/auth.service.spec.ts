import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TokenService } from '../../core/auth/token.service';
import { of } from 'rxjs';

class MockTokenService {
  private token: string | null = null;
  setToken(t: string): void {
    this.token = t;
  }
  removeToken(): void {
    this.token = null;
  }
  hasToken(): boolean {
    return !!this.token;
  }
}

class MockRouter {
  urlNavegada: string[] = [];
  navigate(commands: string[]): Promise<boolean> {
    this.urlNavegada = commands;
    return Promise.resolve(true);
  }
}

class MockHttpClient {
  get(url: string) {
    return of({ id: 1, name: 'Admin' });
  }
}

describe('AuthService', () => {
  let service: AuthService;
  let tokenService: MockTokenService;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: TokenService, useClass: MockTokenService },
        { provide: Router, useClass: MockRouter },
        { provide: HttpClient, useClass: MockHttpClient },
      ],
    });

    service = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService) as unknown as MockTokenService;
    router = TestBed.inject(Router) as unknown as MockRouter;

    localStorage.clear();
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve realizar login com sucesso e salvar dados no storage', fakeAsync(() => {
    const email = 'admin@email.com';
    const senha = '123456@';
    let tokenRecebido = '';

    service.login(email, senha).subscribe((token) => (tokenRecebido = token));

    // Simula a passagem do tempo de 1000ms do delay()
    tick(1000);

    expect(tokenRecebido).toBe('fake-jwt-token-123456@');
    expect(localStorage.getItem('user_email')).toBe(email);
    expect(tokenService.hasToken()).toBeTrue();
  }));

  it('deve retornar erro ao tentar login com credenciais inválidas', (done) => {
    service.login('errado@email.com', '000').subscribe({
      next: () => fail('Deveria ter retornado um erro'),
      error: (err: Error) => {
        expect(err.message).toBe('Credenciais inválidas');
        done();
      },
    });
  });

  it('deve limpar dados e navegar para a raiz ao fazer logout', () => {
    localStorage.setItem('user_email', 'teste@email.com');
    tokenService.setToken('token-ativo');

    service.logout();

    expect(localStorage.getItem('user_email')).toBeNull();
    expect(tokenService.hasToken()).toBeFalse();
    expect(router.urlNavegada).toEqual(['/']);
  });

  it('deve retornar o email do usuário armazenado no localStorage', () => {
    localStorage.setItem('user_email', 'admin@email.com');
    expect(service.getUserEmail()).toBe('admin@email.com');
  });

  it('deve retornar string vazia se não houver email no localStorage', () => {
    expect(service.getUserEmail()).toBe('');
  });

  it('deve verificar se o usuário está autenticado através do TokenService', () => {
    tokenService.setToken('abc');
    expect(service.isAuthenticated()).toBeTrue();

    tokenService.removeToken();
    expect(service.isAuthenticated()).toBeFalse();
  });
});
