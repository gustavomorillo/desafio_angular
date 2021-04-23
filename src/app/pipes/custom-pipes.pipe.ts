import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
moment.locale('es');
@Pipe({
  name: 'customPipes',
})

// Pipe para calcular la edad del personaje
export class CustomPipesPipe implements PipeTransform {
  transform(value: any): any {
    if (value == '') {
      return '';
    }
    let today = moment();
    let birthdate = moment(value, 'DD/MM/YYYY');

    let years = today.diff(birthdate, 'years');
    let html: number = years;

    return html;
  }
}
