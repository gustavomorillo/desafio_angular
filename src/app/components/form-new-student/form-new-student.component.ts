import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-form-new-student',
  templateUrl: './form-new-student.component.html',
  styleUrls: ['./form-new-student.component.css'],
})
export class FormNewStudentComponent implements OnInit {
  form: FormGroup;
  url: any;
  file: File;
  data = [];

  constructor(private fb: FormBuilder, private storage: StorageMap) {
    this.createForm();
    this.loadData();
  }

  // Obtengo los nuevos estudiantes guardados en el local storage
  loadData() {
    this.storage.get('character').subscribe((character) => {
      character ? this.data.push(character) : (this.data = []);
    });
  }

  // validacion del campo nombre

  get nameNotValid() {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }

  ngOnInit(): void {}

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      patronus: [''],
      age: [''],
      image: [''],
    });
  }

  // Funcion para visualizar un preview de la imagen

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  // Guardar formulario

  save() {
    let forma = this.form;

    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      // Si es valido, guardo todos los campos incluida la foto(base64) en local storage

      let character;
      let characterSave;
      let reader = new FileReader();
      let age;
      let patronus;

      reader.readAsDataURL(this.file);
      reader.onload = () => {
        if (forma.value.age) {
          age = forma.value.age;
        } else {
          age = '';
        }
        if (forma.value.patronus) {
          patronus = forma.value.patronus;
        } else {
          patronus = '';
        }
        character = reader.result;
        characterSave = {
          name: forma.value.name,
          age: age,
          patronus: patronus,
          image: character.toString(),
        };
        this.storage.set('character', characterSave).subscribe(() => {
          this.loadData();
        });
      };
    }
  }
}
