import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AvisoPrivComponent } from './pages/aviso-priv/aviso-priv.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { CursosPageComponent } from './pages/cursos/cursos.component';

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
    path: 'cursos',
    component: CursosPageComponent
  },
  {
    path: 'avisopriv',
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
  imports: [RouterModule.forRoot(routes, { preloadingStrategy:PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
