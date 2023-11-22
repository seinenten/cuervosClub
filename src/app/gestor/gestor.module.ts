import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestorRoutingModule } from './gestor-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    InicioComponent,
    NavbarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    GestorRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    
  ]
})
export class GestorModule { }
