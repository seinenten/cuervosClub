import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar-gestor',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  panelOpenState = false;
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    public sidebarService: SidebarService
  ) { }

  logout(){
    this.usuarioService.logout();
    this.router.navigateByUrl('/auth/login');
  }


}
