import { CorporateCustomers } from './../models/corporateCustomers';
import { IndividualCustomers } from './../models/individualCustomers';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private httpClient : HttpClient) { }
  
  getCorporateCustomers(): Observable<CorporateCustomers[]>{
    return this.httpClient.get<CorporateCustomers[]>('http://localhost:3000/corporateCustomers')
  }
  getIndividualCustomers(): Observable<IndividualCustomers[]>{
    return this.httpClient.get<IndividualCustomers[]>('http://localhost:3000/individualCustomers')
  }

  getCorporateCustomerDetail(id: number): Observable<CorporateCustomers[]>{
    return this.httpClient.get<CorporateCustomers[]>('http://localhost:3000/corporateCustomers?customerId=' + id)
  }
  getIndividualCustomerDetail(id: number): Observable<IndividualCustomers[]>{
    return this.httpClient.get<IndividualCustomers[]>('http://localhost:3000/individualCustomers?customerId=' + id)
  }




  


 
}
