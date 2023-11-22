import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(
    private router: Router
  ) { }

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu') || '' ) || [];
    
    if( this.menu.length === 0 ){
      //Redireccionar al login
      return this.router.navigateByUrl('/auth/login');
    }
    return
  }
  

  menu: any[] = [
    {
      titulo: 'Menu',
      icono: 'home',
      submenu: [
        {  
          titulo: 'Inicio', url: '/gestor/inicio'
        },
        {  
          titulo: 'Mi cuenta', url: '/gestor/perfil'
        },
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'settings',
      submenu: [
        {
            titulo: 'Usuarios', url: '/gestor/usuarios'
        },                    
        {
            titulo: 'Cursos', url: '/gestor/cursos'
        }
      ]
    }
  ];
  
}
