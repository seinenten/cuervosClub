import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map,delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuarios } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService {

  private baseUrl: string = environment.base_url;

  constructor(
    private http: HttpClient  
  ) { }


  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
    
    const email = control.value;
    return this.http.get<Usuarios[]>(`${ this.baseUrl }/usuarios/${ email  }` )
                    .pipe(
                      delay(2500),
                      map( (resp:any) => {
                        return ( resp.emails.length === 0 )
                            ? null
                            :  {  emailTomado: true }
                      } )
                    )


  }


}
