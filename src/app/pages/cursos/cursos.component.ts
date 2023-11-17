import { Component, OnInit, inject } from '@angular/core';
import { Curso } from 'src/app/interfaces/traerCursos-response';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosPageComponent implements OnInit{
  
  cursos: Curso[] = [];
  
  private cursosService = inject(CursosService);
  
  
  ngOnInit(): void {
    this.cursosService.getCursos().subscribe(
      cursos => this.cursos = cursos
    );
  }

}
