import { IndividualCustomers } from './../../libs/models/individualCustomers';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastNamePipe'
})
export class LastNamePipe implements PipeTransform {


  transform(value: IndividualCustomers[], item: string): IndividualCustomers[] {

    return value.filter(name => !item || name.lastName?.toLocaleLowerCase().includes(item.toLocaleLowerCase()))
  }


}
