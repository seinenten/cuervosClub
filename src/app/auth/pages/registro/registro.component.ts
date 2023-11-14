import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  private fb = inject(FormBuilder);
  private vs = inject(ValidatorsService);
  private router = inject(Router);
  private authService = inject(AuthService);

  miFormulario: FormGroup = this.fb.group({
    email: [ '', [ Validators.required, Validators.pattern(this.vs.emailPattern) ] ,  ],
    password: [ '' ,[Validators.required, Validators.minLength(6) ]  ],
    password2: [ '' ,[Validators.required  ]  ],
    name: [ '', [Validators.required, Validators.minLength(3) ]  ]
  },{
    validators: [
      this.vs.contraseñaSonIguales('password', 'password2')
    ]
  });

  get emailErrorMsg(): string {
    
    const errors = this.miFormulario.get('email')?.errors;
    if( errors?.['required']  ){
      return 'El correo es obligatorio';
    }else if( errors?.['pattern'] ){
      return 'No es un formato de correo valido';
    }

    return '';
  
  }

  campoNoEsValido(campo: string){
    return this.miFormulario.controls[campo]?.errors 
    && this.miFormulario.controls[campo].touched 
  }


  register(){

    const { name, email, password } = this.miFormulario.value;

    console.log({ name, email, password })

    // this.authService.register(email,name,password)
    //         .subscribe({
    //           next: () => this.router.navigateByUrl('/dashboard'),
    //           error: (message) => {
    //             Swal.fire('Error', message, 'error')
    //           }
    //         })


  }



}
