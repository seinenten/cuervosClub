import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Curso } from '../interfaces/traerCursos-response';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private baseUrl: string = environment.base_url;
  private http = inject(HttpClient)

  getCursos():Observable<Curso[]>{
    const url = `${ this.baseUrl }/cursos`;  
    return this.http.get<{ok: boolean, cursos: Curso[]}>(url)
          .pipe(
            map(  (resp: { ok: boolean, cursos:Curso[] }) => resp.cursos )
          )
  }

  smallGetCursos():Observable<Curso[]>{
    const url = `${ this.baseUrl }/cursos?limite=3`;  
    return this.http.get<{ok: boolean, cursos: Curso[]}>(url)
            .pipe(
              map(  (resp: { ok: boolean, cursos:Curso[] }) => resp.cursos )
            )
  }

  getCursoPorId(id: string):Observable<Curso>{
    const url = `${ this.baseUrl }/cursos/${id}`;  
    return this.http.get<{ok: boolean, curso: Curso}>(url)
          .pipe(
            map(  (resp: { ok: boolean, curso:Curso }) => resp.curso )
          )
  }




}
