import { CorporateCustomers } from './../../libs/models/corporateCustomers';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taxNumberPipe'
})
export class TaxNumberPipe implements PipeTransform {

  transform(value: CorporateCustomers[],item: number): CorporateCustomers[] {
    
    return value.filter(tax => !item || tax.taxNumber?.toString().includes(item.toString()))
  }

}
