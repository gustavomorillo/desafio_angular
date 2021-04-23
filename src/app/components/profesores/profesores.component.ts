import { Component, OnInit } from '@angular/core';
import { Character, MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css'],
})
export class ProfesoresComponent implements OnInit {
  constructor(private _mainService: MainService) {
    this.getTeachers();
  }

  ngOnInit(): void {}
  teachers: Character[];

  // Obtengo mediante el servicio main los profesores

  getTeachers(): void {
    this._mainService.getTeachers().subscribe((resp: any) => {
      this.teachers = resp;
    });
  }
}
