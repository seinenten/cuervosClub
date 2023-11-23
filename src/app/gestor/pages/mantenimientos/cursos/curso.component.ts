import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Curso } from 'src/app/interfaces/traerCursos-response';
import { CursosService } from 'src/app/services/cursos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html'
})
export class CursoComponent {

  public cursoForm!: FormGroup;

  //Para conocer si es crear o editar
  public cursoSeleccionado!: Curso


  //Imagen

  private imgSubs!: Subscription;

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private modalImagenService: ModalImagenService,
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.activateRoute.params.subscribe( ({ id }) => {
      this.cargarCurso(id)
    })

    this.cursoForm = this.fb.group({
      nombre:['', [Validators.required]],
      descripcion: ['', [Validators.required,]],
      precio: ['', [Validators.required]  ],
    })

  }

  actualizarImagen(id: string){
    this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe(delay(100))
        .subscribe( img => this.cargarCurso(id) );
  }

  abrirModal( curso: Curso ){
    this.modalImagenService.abrirModal( 'cursos', curso._id!, curso.img )
  }

  guardarCurso(){
    const { nombre } = (this.cursoForm.value);

    if( this.cursoSeleccionado) {
      const data = {
        ...this.cursoForm.value,
        _id: this.cursoSeleccionado._id
      }

      this.cursosService.actualizarCurso( data )
            .subscribe(resp => {
              Swal.fire('Curso Actualizada', `${ nombre } Actualizado correctamente`, 'success' );
            })

    } else {
      this.cursosService.agregarCurso(this.cursoForm.value)
          .subscribe( (resp: any) => {
            console.log(resp);
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success' );
            this.router.navigateByUrl(`/gestor/curso/${ resp.curso._id }`)
          })
    }
  }


  cargarCurso(id: string){

    if( id === 'nuevo' ){
      return;    
    }

    this.cursosService.getCursoPorId(id)
        .pipe(
          delay(100)
        )
        .subscribe( (curso:any) => {
          // Si el usuario escribe un id falso que no se encuentra en bd. Se hace una redireccion
          if (!curso ){
            return this.router.navigateByUrl(`/gestor/cursos`)
          }

          this.actualizarImagen(id);

          const { nombre, descripcion, precio } = curso;

          this.cursoSeleccionado = curso;
          //colocarle el valor al formulario si hay liga
          this.cursoForm.setValue({ nombre, descripcion, precio  })
          return true;
        })
  }

  campoNoEsValido(campo: string){
    return this.cursoForm.controls[campo]?.errors
    && this.cursoForm.controls[campo].touched
  }

}
