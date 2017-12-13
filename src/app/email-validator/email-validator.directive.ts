import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, Validators } from '@angular/forms';

const EMAIL_REGEXP =
  /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

function testDotAfterStrudel(val) {
  return val.lastIndexOf('.') > val.indexOf('@');
}

export class EmailValidator {

  static email(control: AbstractControl): ValidationErrors | null {
    if (typeof control.value === 'undefined' || control.value === null || control.value.length === 0) {
      return null;
    }
    return testDotAfterStrudel(control.value) && EMAIL_REGEXP.test(control.value) ? null : { 'email': true };
  }
}

export const EMAIL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EmailValidatorDirective),
  multi: true
};

@Directive({
  selector: '[appEmailValidator][formControlName],[appEmailValidator][formControl],[appEmailValidator][ngModel]',
  providers: [EMAIL_VALIDATOR]
})
export class EmailValidatorDirective implements Validator {
  private _onChange: () => void;

  validate(c: AbstractControl): ValidationErrors | null {
    return EmailValidator.email(c);
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onChange = fn;
  }
}
