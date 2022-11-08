import { indCustomerSelector, corpCustomerSelector } from './../store/selectors/customer.selector';
import { serviceSelector } from '../store/selectors/service.selector';
import { CorporateCustomers } from './../../../libs/models/corporateCustomers';
import { IndividualCustomers } from './../../../libs/models/individualCustomers';
import { addCorpCustomer, addIndCustomer } from '../store/actions/customer.actions';
import { Service } from './../../../libs/models/service';
import { ServicesService } from './../../../libs/services/services.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  Store } from '@ngrx/store';
import { addService } from '../store/actions/service.actions';
import {  Observable } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  customerType : boolean = true
  indCustomerForm : boolean = false;
  corpCustomerForm : boolean = false;
  showIndCustomer : boolean = false;
  showCorpCustomer : boolean = false;
  CustomerType : string = "";
  services : Service[] = [];
  servicelist : boolean = false;
  selectedService !: Service ;
  customerInfos : boolean = false;
  serviceSelection !: Observable<Service[]>
  indCustomerSelection !: Observable<IndividualCustomers[]>
  corpCustomerSelection !: Observable<CorporateCustomers[]>
  serviceSave  !: Service[];
  indCustomerSave  !: IndividualCustomers[];
  corpCustomerSave  !: CorporateCustomers[];
  

//------------------Customer Forms----------------------------------------------------------------------------------------------------------


  individualForm = new FormGroup({
    firstName: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    nationalIdentity: new FormControl<number>(11111111111, [Validators.required,Validators.min(10000000000),Validators.max(99999999999) ]),
    birthDate: new FormControl<string>('',Validators.required),
  });
  corporateForm = new FormGroup({
    companyName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    taxNumber: new FormControl('11111111', [Validators.required,Validators.min(10000000),Validators.max(99999999) ]),
  });


//------------------Customer Forms----------------------------------------------------------------------------------------------------------



  constructor(private servicesService : ServicesService, private store : Store) { }

  ngOnInit(): void {
    this.getServices()
  }


  IndCustomer(){
    this.indCustomerForm = true;
    this.corpCustomerForm = false;
    this.showIndCustomer = true;
  }
  CorpCustomer(){
    this.indCustomerForm = false;
    this.corpCustomerForm = true;
    this.showCorpCustomer = true;
  }
  onSubmitIndividual(){
    
    this.individualForm.reset();
    this.customerType = false;
    this.servicelist = true;
  }
  onSubmitCorporate(){

    this.individualForm.reset();
    this.customerType = false;
    this.servicelist = true;
  }

  getServices(){
    this.servicesService.getServices().subscribe(response => this.services = response)
  }

  addIndCustomer(){
    if (this.individualForm.invalid) {
      return;
    }

    this.store.dispatch(addIndCustomer({
      customer: this.individualForm.value as IndividualCustomers
    }));

    this.onSubmitIndividual();
   }

   addCorpCustomer(){
    if (this.corporateForm.invalid) {
      return;
    }

    this.store.dispatch(addCorpCustomer({
      customer: this.corporateForm.value as CorporateCustomers
    }));

    this.onSubmitCorporate();
   }


   addService(){
    this.servicelist = false
    this.customerInfos = true


    this.store.dispatch(addService({
      service: this.selectedService
    }));

    //this.store.select<Service[]>(selectedService).subscribe(response => this.serviceSave = response)

    this.serviceSelection = this.store.select(serviceSelector)
    this.serviceSelection.subscribe(response => { this.serviceSave = response })

    this.indCustomerSelection = this.store.select(indCustomerSelector)
    this.indCustomerSelection.subscribe(response => {this.indCustomerSave = response})

    this.corpCustomerSelection = this.store.select(corpCustomerSelector)
    this.corpCustomerSelection.subscribe(response => {this.corpCustomerSave = response})
    
    
    
   }


   saveCustomer(){
    console.log("dsdsa");
    
   }
   
 
  
}

