import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public nombresPattern ="^[A-Z\u00E0-\u00FCÿ\u00f1\u00d1][A-Za-z\u00E0-\u00FCÿ\u00f1\u00d1]+ *[A-Za-z\u00E0-\u00FCÿ\u00f1\u00d1]+ *[A-Za-z\u00E0-\u00FCÿ\u00f1\u00d1]+$";
  public passPattern =/(?=(.*[0-9]))(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{5,}/;

  public contraseñaSonIguales( field1: string, field2: string ) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if ( fieldValue1 !== fieldValue2 ) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      return null;
    }

  }


}
