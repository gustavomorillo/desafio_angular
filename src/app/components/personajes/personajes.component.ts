import { Component, OnInit } from '@angular/core';
import { MainService, Character } from 'src/app/services/main.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css'],
})
export class PersonajesComponent implements OnInit {
  constructor(private _mainService: MainService) {}

  ngOnInit(): void {}
  characters: Character[];

  // Obtengo mediante el servicio main los personajes

  getCharacters($house: string): void {
    this._mainService.getCharacters($house).subscribe((resp: any) => {
      this.characters = resp;
    });
  }

  // Al momento de seleccionar una casa se ejecuta el servicio que trae la data

  onChange($e) {
    this.getCharacters($e.target.value);
  }
}
