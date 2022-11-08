import { Subscription } from './../models/subscription';
import { Customer } from './../models/customer';
import { CorporateCustomers } from './../models/corporateCustomers';
import { IndividualCustomers } from './../models/individualCustomers';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';

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

  addCorporateCustomer(customer : CorporateCustomers):Observable<CorporateCustomers>{
    return this.httpClient.post<CorporateCustomers>('http://localhost:3000/corporateCustomers', customer)
  }

  addIndividualCustomer(customer : IndividualCustomers):Observable<IndividualCustomers>{
    return this.httpClient.post<IndividualCustomers>('http://localhost:3000/individualCustomers', customer)
  }

  addCustomer(customer : Customer):Observable<Customer>{
    return this.httpClient.post<Customer>('http://localhost:3000/customers', customer)
  }

  addSubscriptions(id: number, serviceId : number | undefined):Observable<Subscription>{
    const data = { customerId: id ,serviceId: serviceId , dateStarted: new Date() }
    
    return this.httpClient.post<Subscription>('http://localhost:3000/subscriptions', data)
  }

  addInvoices(id: number ):Observable<Invoice>{

    let date = new Date()

    const data = { subscriptionId: id , dateCreated: new Date(), dateDue: date.setFullYear(date.getFullYear() + 1)}

    return this.httpClient.post<Invoice>('http://localhost:3000/invoices', data)
  }

  




  


 
}
