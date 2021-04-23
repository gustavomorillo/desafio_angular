import { Component, OnInit } from '@angular/core';
import { Character, MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css'],
})
export class EstudiantesComponent implements OnInit {
  constructor(private _mainService: MainService) {
    this.getTeachers();
  }

  ngOnInit(): void {}
  students: Character[];

  // Obtengo mediante el servicio main los profesores
  getTeachers(): void {
    this._mainService.getStudents().subscribe((resp: any) => {
      this.students = resp;
    });
  }
}
