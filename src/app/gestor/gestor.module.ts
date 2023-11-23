import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestorRoutingModule } from './gestor-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { UsuariosComponent } from './pages/mantenimientos/usuarios/usuarios.component';
import { CursosComponent } from './pages/mantenimientos/cursos/cursos.component';
import { CursoComponent } from './pages/mantenimientos/cursos/curso.component';
import { PerfilComponent } from './pages/mantenimientos/perfil/perfil.component';
import { ImagenesModule } from '../imagenes/imagenes.module';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    InicioComponent,
    NavbarComponent,
    HeaderComponent,
    UsuariosComponent,
    CursosComponent,
    CursoComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    GestorRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    ImagenesModule,
    PipesModule
  ]
})
export class GestorModule { }
