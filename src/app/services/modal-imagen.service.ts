import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private baseUrl = environment.base_url;

  private _ocultarModal: boolean = true;
  public tipo!: 'usuarios' | 'cursos';
  public id!: string;
  public img!: string;

  // Al momento en el que guarda una imagen emitimos un valor al camponente para que se actualize el navegador
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  abrirModal(
    tipo: 'usuarios' | 'cursos' ,
    id: string,
    img: string = 'no-image'
  ){
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    this.img = img;

    if( img.includes('https') ){
      this.img = img;
    }else {
      this.img = `${ this.baseUrl }/upload/${ tipo }/${ img }`;
    }

  }

}
