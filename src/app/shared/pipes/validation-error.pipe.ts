import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationError',
  standalone: true,
})
export class ValidationErrorPipe implements PipeTransform {
  private readonly messages: Record<string, (err: ValidationErrors) => string> = {
    required: () => 'Este campo é obrigatório.',
    email: () => 'O email deve ser válido.',
    minlength: (err) => `Mínimo de ${err['requiredLength']} caracteres.`,
    maxlength: (err) => `Máximo de ${err['requiredLength']} caracteres.`,
  };

  transform(errors: ValidationErrors | null | undefined): string | null {
    if (!errors) return null;

    const firstKey = Object.keys(errors)[0];
    const getMessage = this.messages[firstKey];

    return getMessage ? getMessage(errors[firstKey]) : 'Campo inválido.';
  }
}
