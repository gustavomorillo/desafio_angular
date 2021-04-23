import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const endpoint = 'http://hp-api.herokuapp.com/api/characters/house/slytherin';
@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}

  // Endpoint GET para consultar personaje segun la casa.
  getCharacters($house): Observable<any> {
    return this.http
      .get(`http://hp-api.herokuapp.com/api/characters/house/${$house}`)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  // Endpoint GET para consultar profesores
  getTeachers(): Observable<any> {
    return this.http
      .get('http://hp-api.herokuapp.com/api/characters/staff')
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  // Endpoint GET para consultar estudiantes
  getStudents(): Observable<any> {
    return this.http
      .get('http://hp-api.herokuapp.com/api/characters/students')
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  private extractData(res: Response): any {
    const body = res;
    return body || {};
  }

  // Manejo de errores en las peticiones
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

export interface Character {
  name: string;
  patronus: string;
  age: number;
  image: string;
}
