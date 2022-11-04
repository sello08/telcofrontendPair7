import { IndividualCustomers } from './../../libs/models/individualCustomers';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'birthDatePipe'
})
export class BirthDatePipe implements PipeTransform {

  transform(value: IndividualCustomers[], item: string): IndividualCustomers[] {
    let dt = new Date();
    return value.filter(name => !item || new Date(name.birthDate) > new Date(item) )
  }

}
