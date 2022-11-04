import { CorporateCustomers } from './../../libs/models/corporateCustomers';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterNamePipe'
})
export class FilterNamePipePipe implements PipeTransform {

  transform(value: CorporateCustomers[], item: string): CorporateCustomers[] {
    return value.filter(name => !item || name.companyName?.toLocaleLowerCase().includes(item.toLocaleLowerCase()))
  }

}
