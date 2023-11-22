import { Component, OnInit,AfterViewInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ValidatorsService } from '../../../services/validators.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  public formSubmitted = false;

  //TodoS inyecciones //
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private vs = inject( ValidatorsService );
  private usuarioService = inject(UsuarioService);

  miFormulario: FormGroup = this.fb.group({
    email: [ '', [ Validators.required, Validators.pattern( this.vs.emailPattern ) ]  ],
    password: ['', Validators.required]
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

  login(){

    this.usuarioService.login( this.miFormulario.value )
        .subscribe(
          {
            next: () => {
              this.router.navigateByUrl('gestor/inicio')
            },
            error:err => {
              // si sucede un error
              Swal.fire('Error', err.error.msg, 'error');  
            },
          });
  }

}
