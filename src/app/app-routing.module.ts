import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { InicioComponent } from './inicio/inicio.component';
import { AvisoPrivComponent } from './aviso-priv/aviso-priv.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'avisos',
    component: AvisoPrivComponent
  },
  {
    path: 'nosotros',
    component: AcercaDeComponent
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'gestor',
    loadChildren: () => import('./gestor/gestor.module').then(m => m.GestorModule)
  },
  {
    path: '**',
    redirectTo: '404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
