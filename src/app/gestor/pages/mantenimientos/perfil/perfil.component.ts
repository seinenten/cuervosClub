import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/users.models';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public miFormulario!: FormGroup;

  public usuario!: Usuario

  public imagenSubir!: File;

  public imgTemp: any = '' ;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
  }


  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      nombre: [ this.usuario.nombre , Validators.required],
      apellidoP: [ this.usuario.apellidoP , Validators.required],
      apellidoM: [ this.usuario.apellidoM , Validators.required],
      email: [ this.usuario.email , [Validators.required, Validators.email ]]
    });
  }

  actualizarPerfil(){

    this.usuarioService.actualizarPerfil( this.miFormulario.value )
        .subscribe(
          {
            next: resp => {
              //En javascript todos los objetos son pasados por referencia. Estamos modificando el Usuario Service
              const { nombre, email } = this.miFormulario.value;
              this.usuario.nombre = nombre;
              this.usuario.email = email;

              // Colocar swit alert usuario a sido actualizado
              Swal.fire('Guardado', 'Los cambios fueron guardados', 'success');
            },
            error: err => {
              Swal.fire('Error', err.error.msg , 'error');
            }
          });
          //Forma CORRECTA DE HACER EL SUBSCRIBE PARA TENER EL ERROR
  }


  cambiarImagen( file: File ) {
    this.imagenSubir = file;

    if( !file )
    {
        this.imgTemp = null;
        return
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }


  subirImagen(){

    this.fileUploadService
        .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid! )
            .then( img =>{
              this.usuario.img = img;
              if(img){
                Swal.fire('Guardado', 'Imagen actualizada', 'success');
              }else{
                Swal.fire('Error', 'Extension no permitida' , 'error');
              }

            }).catch( err => {
              Swal.fire('Error', err.error.msg , 'error');
            });

  }

}
