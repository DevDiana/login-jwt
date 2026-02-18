import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

import { of, throwError } from 'rxjs';

class MockAuthService {
  simularErro = false;

  login(email: string, pass: string) {
    if (this.simularErro) {
      return throwError(() => new Error('Falha no login'));
    }
    return of('fake-token');
  }
}

class MockRouter {
  rotaNavegada: string[] = [];
  navigate(commands: string[]): Promise<boolean> {
    this.rotaNavegada = commands;
    return Promise.resolve(true);
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: MockAuthService;
  let router: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
    router = TestBed.inject(Router) as unknown as MockRouter;

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve iniciar com o formulário inválido', () => {
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('deve validar mensagens de erro quando os campos estão vazios e o formulário é enviado', () => {
    component.onSubmit();
    expect(component.loginForm.get('email')?.touched).toBeTrue();
    expect(component.loginForm.get('password')?.touched).toBeTrue();
  });

  it('deve chamar o serviço de login e navegar para o dashboard em caso de sucesso', () => {
    component.loginForm.setValue({
      email: 'admin@email.com',
      password: '123456@',
    });

    component.onSubmit();

    expect(component.isLoading).toBeFalse();
    expect(router.rotaNavegada).toEqual(['/dashboard']);
  });

  it('deve exibir mensagem de erro quando a autenticação falhar', () => {
    authService.simularErro = true;

    component.loginForm.setValue({
      email: 'usuario@errado.com',
      password: 'senha-errada',
    });

    component.onSubmit();

    expect(component.loginError).toBe('Falha no login');
    expect(component.isLoading).toBeFalse();
  });

  it('deve validar o comprimento mínimo da senha', () => {
    const senha = component.loginForm.get('password');
    senha?.setValue('123');
    expect(senha?.hasError('minlength')).toBeTrue();
  });
});
