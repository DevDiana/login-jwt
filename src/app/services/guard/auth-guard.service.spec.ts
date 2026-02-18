import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authGuard } from './auth-guard.service';
import { AuthService } from '../auth/auth.service';

class MockAuthService {
  private authenticated = false;

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  setAuthenticated(value: boolean): void {
    this.authenticated = value;
  }
}

class MockRouter {
  lastNavigatedUrl: string[] = [];

  navigate(commands: string[]): Promise<boolean> {
    this.lastNavigatedUrl = commands;
    return Promise.resolve(true);
  }
}

describe('authGuard', () => {
  let authService: MockAuthService;
  let router: MockRouter;

  const routeMock = {} as ActivatedRouteSnapshot;
  const stateMock = {} as RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    });

    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
    router = TestBed.inject(Router) as unknown as MockRouter;
  });

  it('deve permitir o acesso quando o usuário estiver autenticado', () => {
    authService.setAuthenticated(true);

    const resultado = TestBed.runInInjectionContext(() => authGuard(routeMock, stateMock));

    expect(resultado).toBeTrue();
  });

  it('deve bloquear o acesso e redirecionar para a home quando não estiver autenticado', () => {
    authService.setAuthenticated(false);

    const resultado = TestBed.runInInjectionContext(() => authGuard(routeMock, stateMock));

    expect(resultado).toBeFalse();
    expect(router.lastNavigatedUrl).toEqual(['/']);
  });
});
