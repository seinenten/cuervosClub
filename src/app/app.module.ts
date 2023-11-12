import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AvisoPrivComponent } from './aviso-priv/aviso-priv.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { CursosComponent } from './components/cursos/cursos.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ErrorPageComponent,
    AvisoPrivComponent,
    AcercaDeComponent,
    NavbarComponent,
    FooterComponent,
    CarruselComponent,
    CursosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
