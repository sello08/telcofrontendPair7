import { IndividualCustomers } from './../../libs/models/individualCustomers';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstNamePipe'
})
export class FirstNamePipe implements PipeTransform {

  transform(value: IndividualCustomers[], item: string): IndividualCustomers[] {

    return value.filter(name => !item || name.firstName?.toLocaleLowerCase().includes(item.toLocaleLowerCase()))
  }

}
