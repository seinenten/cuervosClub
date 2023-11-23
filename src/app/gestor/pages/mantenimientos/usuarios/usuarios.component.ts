import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Usuario } from 'src/app/models/users.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;

  public cargando: boolean = true;

  public imgSubs!: Subscription;

  constructor(
    public usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) { }



  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe(delay(100))
        .subscribe( img => this.cargarUsuarios() );
  }

  cargarUsuarios() {
    this.cargando = true;

    this.usuarioService.cargarUsuarios( this.desde )
      .subscribe( ({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      })
  }


  cambiarPagina( valor: number ){
    this.desde += valor;

    if ( this.desde < 0 ){
      this.desde = 0;
    }else if( this.desde >= this.totalUsuarios  ){
      this.desde -= valor;
    }

    this.cargarUsuarios();

  }


  buscar( termino:string ){

    if( termino.length === 0 ){
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar( 'usuarios', termino )
            .subscribe( resultados => {
              this.usuarios = resultados as Usuario[] ;
            });

    return true;
  }


  eliminarUsuario( usuario: Usuario ){

    if( usuario.uid === this.usuarioService.uid ){
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ usuario.nombre } !`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.desactivarUsuario( usuario )
            .subscribe( () => {

              this.cargarUsuarios();

              Swal.fire(
                'Eliminado!',
                `${ usuario.nombre } fue eliminado correctamente`,
                'success'
              )

            });


      }
    });

    return true;
  }



  cambiarRole( usuario:Usuario ){

    this.usuarioService.cambiarRolUsuario(usuario)
            .subscribe(
              {
              next: resp => {
                Swal.fire(
                  'Actualizado!',
                  `${ usuario.nombre } se le a actualizado su Role por: ${ usuario.role }`,
                  'success'
                )
              },
              error: err => {
                Swal.fire('Error', err.error.msg , 'error');
              }
            });

  }



  abrirModal( usuario: Usuario ){
    // console.log(usuario);

    this.modalImagenService.abrirModal( 'usuarios', usuario.uid! , usuario.img );
  }

}
