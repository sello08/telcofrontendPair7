import { CorporateCustomers } from './../../../libs/models/corporateCustomers';
import { IndividualCustomers } from './../../../libs/models/individualCustomers';
import { addCorpCustomer, addIndCustomer } from '../actions/customer.actions';
import { Service } from './../../../libs/models/service';
import { ServicesService } from './../../../libs/services/services.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  customerType : boolean = true
  indCustomerForm : boolean = false;
  corpCustomerForm : boolean = false;
  CustomerType : string = "";
  services : Service[] = [];
  servicelist : boolean = false;


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


  constructor(private servicesService : ServicesService, private store : Store) { }

  ngOnInit(): void {
    this.getServices()
  }


  IndCustomer(){
    this.indCustomerForm = true;
    this.corpCustomerForm = false;
  }
  CorpCustomer(){
    this.indCustomerForm = false;
    this.corpCustomerForm = true;
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
   }

   addCorpCustomer(){
    if (this.corporateForm.invalid) {
      return;
    }

    this.store.dispatch(addCorpCustomer({
      customer: this.corporateForm.value as CorporateCustomers
    }));
   }

 

  selectService(){
    console.log("you select a service");
    
  }
}
