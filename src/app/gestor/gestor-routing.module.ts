import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { UsuariosComponent } from './pages/mantenimientos/usuarios/usuarios.component';
import { CursosComponent } from './pages/mantenimientos/cursos/cursos.component';
import { CursoComponent } from './pages/mantenimientos/cursos/curso.component';
import { PerfilComponent } from './pages/mantenimientos/perfil/perfil.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [ AuthGuard ],
    canLoad: [ AuthGuard ],
    children: [
      {
        path: 'inicio',
        component: InicioComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
        //Mantenimientos
      {
        path: 'usuarios',
        canActivate: [ AdminGuard ]
        ,
        component: UsuariosComponent
      },
      {
        path: 'cursos',
        canActivate: [ AdminGuard ]
        ,
        component: CursosComponent
      },
      {
        path: 'curso/:id',
        canActivate: [ AdminGuard ]
        ,
        component: CursoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestorRoutingModule { }
