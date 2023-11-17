import { Component, Input } from '@angular/core';
import { Curso } from 'src/app/interfaces/traerCursos-response';

@Component({
  selector: 'component-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {

  @Input() curso!: Curso;

}
