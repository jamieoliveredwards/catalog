import { AbstractControl } from '@angular/forms';

export function luhnValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const digits: number[] = [...control.value];
  const reversed = digits.reverse();
  const s1 = reversed.reduce((acc, digit, index) => index % 2 === 0 ? acc + +digit : acc, 0);
  const s2 = reversed.reduce((acc, digit, index) => {
    if (index % 2 !== 0) {
      const multiple = digit * 2;
      const manipulatedDigit = multiple <= 9 ? multiple : [...multiple.toString()].reduce((tot, value) => tot + +value, 0);
      return acc + manipulatedDigit;
    }
    return acc;
  }, 0);
  const sum = s1 + s2;
  return sum % 10 === 0 ? null : { luhn: true };
}
