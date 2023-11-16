import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Usuario } from '../models/users.models';
import { loginForm } from '../interfaces/login-form.interface';
import { Usuarios } from '../interfaces/auth.interface';
import { CargarUsuario } from '../interfaces/cargar.usuarios.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl: string = environment.base_url;

  public usuario!: Usuario;

  constructor(
    private http: HttpClient
  ) { }


    //obtener el el token de nuestro localstorage
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  
  //obtener el rol de nuestra instancia del modelo
  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role!;
  }

  //obtener el uid de nuestra instancia del modelo
  get uid():string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
        headers:  {
        'x-token': this.token
      }
    }
  }

  guardarLocalStorage(token: string, menu: any, aud: any = ''){

    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
    if(aud !== ''){
      localStorage.setItem('aud', aud);
    }

  }


  logout(){
      
    localStorage.removeItem('token');
      localStorage.removeItem('menu');
      if(localStorage.getItem('aud'))
        localStorage.removeItem('aud');

  }

  //En caso del que token no sea valido borrar el local storage

  validarToken(): Observable<boolean> {

    return this.http.get(`${this.baseUrl }/login/renew`, {
      headers:{
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any ) => {
        //hacer un console.log() de la resp para obtener las variables a desestructurar
        // console.log(resp)
        const { apellidoM, apellidoP ,email, google, img = '', nombre, role, status, uid} = resp.usuario;
        // Se colocan los datos segun como vayan en la firma "mouse en los parentesis para que salga la firma"
        this.usuario = new Usuario(nombre, apellidoP, apellidoM, email, '', img, google, role, status, uid   );
        
        this.guardarLocalStorage(resp.token, resp.menu);

        return true;
      },
      ),
      catchError( error => of(false) )
    );

  }

  crearUsuario( usuario: Usuarios ):Observable<Usuarios>{
    
    return this.http.post<Usuarios>(`${ this.baseUrl }/usuarios`, usuario)
                .pipe(
                  tap( (resp: any) => {
                    //Coloco el token en el storage
                    this.guardarLocalStorage(resp.token, resp.menu);
                  })
                )
  }

  login( formData: loginForm){
    return this.http.post(`${ this.baseUrl }/login`, formData)
              .pipe(
                tap( (resp: any) => {
                  //Coloco el token en el storage
                  this.guardarLocalStorage(resp.token, resp.menu);
                })
              )
  }

  actualizarPerfil( data: { email: string, nombre: string, role: string, status: boolean } ){

    data = {
      ...data,
      role: this.usuario.role || 'USER_ROLE',
      status: this.usuario.status || false
    }

    return this.http.put( `${ this.baseUrl }/usuarios/${ this.uid }`, data , this.headers );

  }


  cargarUsuarios( desde: number = 0 ){

    const url = `${ this.baseUrl }/usuarios?desde=${ desde }`
    return this.http.get<CargarUsuario>( url, this.headers )
            .pipe(
              map( resp => {
                const usuarios = resp.usuarios.map( 
                  user => new Usuario( user.nombre, user.apellidoP, user.apellidoM, user.email, '', user.img, user.google, user.role, user.status, user.uid  )
                  );
                  return {
                    total: resp.total,
                    usuarios
                  };
              })
            )

  }

  desactivarUsuario( usuario: Usuario ){

    const desactivar = {
      status: false 
    };

    return this.http.put( `${ this.baseUrl }/usuarios/desactivar/${ usuario.uid }`, desactivar , this.headers );

  }

  activarUsuario( usuario: Usuario ){

    const activar = {
      status: true 
    };

    return this.http.put( `${ this.baseUrl }/usuarios/desactivar/${ usuario.uid }`, activar , this.headers );

  }

  cambiarRolUsuario( usuario: Usuario  ){

    return this.http.put( `${ this.baseUrl }/usuarios/${ usuario.uid }`, usuario , this.headers );

  }

}
