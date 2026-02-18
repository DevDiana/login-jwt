import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../services/auth/auth.service';

class MockAuthService {
  private emailFicticio = 'teste@email.com';
  logoutChamado = false;

  getUserEmail(): string {
    return this.emailFicticio;
  }

  logout(): void {
    this.logoutChamado = true;
  }

  setEmail(email: string): void {
    this.emailFicticio = email;
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: MockAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{ provide: AuthService, useClass: MockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
  });

  it('deve criar o componente', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('deve carregar o e-mail do usuário ao iniciar (ngOnInit)', () => {
    const emailEsperado = 'admin@sistema.com';
    authService.setEmail(emailEsperado);

    fixture.detectChanges();

    const emailNoComponente = (component as unknown as { userEmail: string }).userEmail;
    expect(emailNoComponente).toBe(emailEsperado);
  });

  it('deve chamar o método logout do serviço ao acionar o logout do componente', () => {
    fixture.detectChanges();

    component.logout();

    expect(authService.logoutChamado).toBeTrue();
  });

  it('deve exibir o e-mail corretamente no template', () => {
    const emailEsperado = 'visual@email.com';
    authService.setEmail(emailEsperado);

    fixture.detectChanges();

    const debugElement = fixture.nativeElement as HTMLElement;
    const emailExibido = debugElement.querySelector('.user-email')?.textContent;

    expect(emailExibido).toContain(emailEsperado);
  });
});
