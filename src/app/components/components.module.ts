import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CarruselComponent } from './carrusel/carrusel.component';
import { CursosComponent } from './cursos/cursos.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CarruselComponent,
    CursosComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    CarruselComponent,
    FooterComponent,
    NavbarComponent,
    CursosComponent
  ]
})
export class ComponentsModule { }
