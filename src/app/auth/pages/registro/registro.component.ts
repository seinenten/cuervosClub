import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailValidatorService } from 'src/app/services/email-validator.service';
import { UsuarioService } from 'src/app/services/usuario.service';
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
  private usuarioService = inject(UsuarioService);
  private emailValidator = inject(EmailValidatorService);

  public formSubmitted = false;

  miFormulario: FormGroup = this.fb.group({
    nombre: [ '', [Validators.required, Validators.minLength(3),Validators.pattern(this.vs.nombresPattern) ]  ],
    apellidoP:    [ '' ,   [Validators.required, Validators.minLength(3),Validators.pattern(this.vs.nombresPattern)]  ],
    apellidoM:    [ '' ,   [Validators.required, Validators.minLength(3),Validators.pattern(this.vs.nombresPattern)]  ],
    email: [ '', [ Validators.required, Validators.pattern(this.vs.emailPattern) ] , [ this.emailValidator ] ],
    password: [ '' ,[Validators.required, Validators.minLength(6) ]  ],
    password2: [ '' ,[Validators.required  ]  ],
    condiciones:  [ false , Validators.requiredTrue]
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
    }else if( errors?.['emailTomado'] ){
      return 'El correo electronico ya existe';
    }

    return '';

  }

  get passErrorMsg(): string {

    const errors = this.miFormulario.get('password')?.errors;
    if( errors?.['required']  ){
      return 'La contraseña es obligatoria';
    }else if( errors?.['pattern'] ){
      return 'La contraseña debe de ser mayor a 5 caracteres. tener mayusculas, minusculas y numeros';
    }

    return '';

  }

  campoNoEsValido(campo: string){
    return this.miFormulario.controls[campo]?.errors 
    && this.miFormulario.controls[campo].touched 
  }


  guardar(){

    this.formSubmitted = true;
    if (this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return
    }

    //Desestructuro el objeto para quitarle el pass2 y mandarlo
    const formValue = { ...this.miFormulario.value }
    delete formValue.password2;
    delete formValue.condiciones;
    //Eliminado lo mando
    console.log(formValue);

    this.usuarioService.crearUsuario( formValue )
      .subscribe(
        {
          next: () => {

            //navegar al gestor
            this.router.navigateByUrl('gestor/inicio');
          },
          error: err => {
            Swal.fire('Error', err.error.msg , 'error');
          }
      });

  }

  aceptaTerminos(){
    return !this.miFormulario.get('condiciones')?.value && this.formSubmitted;
  }


}
