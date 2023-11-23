import { Component } from '@angular/core';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Curso } from 'src/app/interfaces/traerCursos-response';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { CursosService } from 'src/app/services/cursos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html'
})
export class CursosComponent {

  cargando: boolean = true;
  public cursos: Curso[] = [];
  public cursosTemp: Curso[] = [];

  private imgSubs!: Subscription;

  constructor(
    private cursoService: CursosService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarCursos();

    this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe(delay(100))
        .subscribe( img => this.cargarCursos() );

  }

  cargarCursos(){
    this.cargando = true;
    this.cursoService.getCursos()
          .subscribe( cursos => {
            this.cargando = false;
            this.cursosTemp = cursos ;
            
            this.cursos = cursos;
          } )
  }

  abrirModal( curso: Curso ){
    this.modalImagenService.abrirModal( 'cursos', curso._id!, curso.img )
  }

  buscar( termino:string ){

    if( termino.length === 0 ){

      return this.cursos = this.cursosTemp;
    }

    this.busquedasService.buscar( 'cursos', termino )
            .subscribe( resultados => {

              this.cursos = resultados as Curso[];
            
            });

    return true;
  }


  borrarCurso( curso: Curso ){

    Swal.fire({
      title: '¿Borrar curso?',
      text: `Esta a punto de borrar a ${ curso.nombre } !`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
          //cambiar liga
        this.cursoService.eliminarCurso( curso._id! )
            .subscribe( () => {

              this.cargarCursos();

              Swal.fire(
                'Eliminado!',
                `${ curso.nombre } fue eliminado correctamente`,
                'success'
              )

            });

        
      }
    });
  }

}
