import { IndividualCustomers } from './../../libs/models/individualCustomers';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idPipe'
})
export class IdPipe implements PipeTransform {

  transform(value: IndividualCustomers[],item: number): IndividualCustomers[] {
    
    return value.filter(id => !item || id.nationalIdentity?.toString().includes(item.toString()))
  }

}
