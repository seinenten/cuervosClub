import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

    //obtener el el token de nuestro localstorage
    get token(): string {
      return localStorage.getItem('token') || '';
    }
    
    //obtener el rol de nuestra instancia del modelo
    // get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    //   return this.usuario.role!;
    // }

    //obtener el uid de nuestra instancia del modelo
    // get uid():string {
    //   return this.usuario.uid || '';
    // }

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
  
    // validarToken(): Observable<boolean> {
  
  
    //   return this.http.get(`${this.baseUrl }/login/renew`, {
    //     headers:{
    //       'x-token': this.token
    //     }
    //   }).pipe(
    //     map( (resp: any ) => {
    //       //hacer un console.log() de la resp para obtener las variables a desestructurar
    //       // console.log(resp)
    //       const { apellidoM, apellidoP ,email, img = '', nombre, role, status, uid} = resp.usuario;
    //       // Se colocan los datos segun como vayan en la firma "mouse en los parentesis para que salga la firma"
    //       this.usuario = new Usuario(nombre, apellidoP, apellidoM, email, '', img, role, status, uid   );
          
    //       this.guardarLocalStorage(resp.token, resp.menu);
  
    //       return true;
    //     },
    //     ),
    //     catchError( error => of(false) )
    //   );
  
    // }
  
    // crearUsuario( usuario: Usuarios ):Observable<Usuarios>{
      
    //   return this.http.post<Usuarios>(`${ this.baseUrl }/usuarios`, usuario)
    //               .pipe(
    //                 tap( (resp: any) => {
    //                   //Coloco el token en el storage
    //                   this.guardarLocalStorage(resp.token, resp.menu);
    //                 })
    //               )
    // }
  
    // login( formData: loginForm){
    //   return this.http.post(`${ this.baseUrl }/login`, formData)
    //             .pipe(
    //               tap( (resp: any) => {
    //                 //Coloco el token en el storage
    //                 this.guardarLocalStorage(resp.token, resp.menu);
    //               })
    //             )
    // }

}
