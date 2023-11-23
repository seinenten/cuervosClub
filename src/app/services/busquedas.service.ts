import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Usuario } from '../models/users.models';
import { Observable } from 'rxjs';
import { Curso } from '../interfaces/traerCursos-response';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  private baseUrl: string = environment.base_url;

  constructor(
    private http: HttpClient
  ) { }

  //obtener el el token de nuestro localstorage
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
        headers:  {
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios( resultados: any[] ): Usuario[]{

    return resultados.map(
      user => new Usuario( user.nombre, user.apellidoP, user.apellidoM, user.email, '', user.img , user.google, user.role, user.status, user.uid  )
    );
  }

  private transformarCursos( resultados: any[] ): Curso[]{

    return resultados;
  }

  buscar( tipo: 'usuarios' | 'cursos' , termino: string )
  {
    const url = `${ this.baseUrl }/todo/coleccion/${ tipo }/${ termino }`
    return this.http.get<any[]>( url, this.headers )
            .pipe(
              map( (resp: any ) => {

                switch(tipo){
                  
                  case 'usuarios':
                    return this.transformarUsuarios( resp.resultados )

                  case 'cursos':
                    return this.transformarCursos( resp.resultados )

                  default:
                    return [];
                }

              })
            );
    }

  busquedaGlobal( termino: string) {

    const url = `${ this.baseUrl }/todo/${ termino }`
    return this.http.get( url, this.headers )

  }



}
