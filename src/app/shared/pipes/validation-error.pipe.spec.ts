import { ValidationErrorPipe } from './validation-error.pipe';
import { ValidationErrors } from '@angular/forms';

describe('ValidationErrorPipe', () => {
  let pipe: ValidationErrorPipe;

  beforeEach(() => {
    pipe = new ValidationErrorPipe();
  });

  it('deve criar uma instância', () => {
    expect(pipe).toBeTruthy();
  });

  it('deve retornar null quando não houver erros', () => {
    expect(pipe.transform(null)).toBeNull();
    expect(pipe.transform(undefined)).toBeNull();
  });

  it('deve retornar a mensagem de campo obrigatório', () => {
    const erros: ValidationErrors = { required: true };
    expect(pipe.transform(erros)).toBe('Este campo é obrigatório.');
  });

  it('deve retornar a mensagem de email inválido', () => {
    const erros: ValidationErrors = { email: true };
    expect(pipe.transform(erros)).toBe('O email deve ser válido.');
  });

  it('deve retornar a mensagem de erro para minlength com o valor correto', () => {
    const erros: ValidationErrors = {
      minlength: { requiredLength: 6, actualLength: 3 },
    };
    expect(pipe.transform(erros)).toBe('Mínimo de 6 caracteres.');
  });

  it('deve retornar a mensagem de erro para maxlength com o valor correto', () => {
    const erros: ValidationErrors = {
      maxlength: { requiredLength: 10, actualLength: 15 },
    };
    expect(pipe.transform(erros)).toBe('Máximo de 10 caracteres.');
  });

  it('deve retornar "Campo inválido." para erros desconhecidos', () => {
    const erros: ValidationErrors = {
      pattern: { requiredPattern: '^[0-9]*$', actualValue: 'abc' },
    };
    expect(pipe.transform(erros)).toBe('Campo inválido.');
  });
});
