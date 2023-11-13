import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AvisoPrivComponent } from './pages/aviso-priv/aviso-priv.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { CursosPageComponent } from './pages/cursos/cursos.component';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ErrorPageComponent,
    AvisoPrivComponent,
    AcercaDeComponent,
    CursosPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
