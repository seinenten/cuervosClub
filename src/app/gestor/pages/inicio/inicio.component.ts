import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/users.models';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  usuario: Usuario;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {
    this.usuario = usuarioService.usuario;
  }


  logout(){
    this.usuarioService.logout();
    this.router.navigateByUrl('auth/login');
  }



}
