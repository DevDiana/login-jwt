import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;
  const CHAVE_TOKEN = 'auth_token';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService],
    });
    service = TestBed.inject(TokenService);

    localStorage.clear();
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve salvar o token no localStorage', () => {
    const tokenFake = 'jwt-123-abc';

    service.setToken(tokenFake);

    expect(localStorage.getItem(CHAVE_TOKEN)).toBe(tokenFake);
  });

  it('deve recuperar o token do localStorage', () => {
    const tokenFake = 'jwt-456-def';
    localStorage.setItem(CHAVE_TOKEN, tokenFake);

    const resultado = service.getToken();

    expect(resultado).toBe(tokenFake);
  });

  it('deve remover o token do localStorage', () => {
    localStorage.setItem(CHAVE_TOKEN, 'token-para-remover');

    service.removeToken();

    expect(localStorage.getItem(CHAVE_TOKEN)).toBeNull();
  });

  it('deve retornar true se houver um token presente', () => {
    localStorage.setItem(CHAVE_TOKEN, 'token-existente');

    const existe = service.hasToken();

    expect(existe).toBeTrue();
  });

  it('deve retornar false se não houver um token presente', () => {
    const existe = service.hasToken();

    expect(existe).toBeFalse();
  });
});
