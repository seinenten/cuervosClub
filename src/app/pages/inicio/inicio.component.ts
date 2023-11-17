import { Component, inject, OnInit } from '@angular/core';
import { Curso } from 'src/app/interfaces/traerCursos-response';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  cursos: Curso[] = [];

  private cursosService = inject(CursosService);

  ngOnInit(): void {
    this.cursosService.smallGetCursos().subscribe(
      cursos => this.cursos = cursos
    );
  }

}
