import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

      //Validar token regresa un true o un false, si es true el guard lo acepta pero si es false el guard lo bloquea, usamos el tap para indicar que si es false nos haga una redireccion
    
      return this.usuarioService.validarToken()
              .pipe(
                tap( estaAutenticado => {

                  if(!estaAutenticado){
                    this.router.navigateByUrl('auth/login');
                  }

                })
              );

    }
  
}
