import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Invoice } from './../../../libs/models/invoice';
import { Subscription } from './../../../libs/models/subscription';
import { CustomerServiceService } from './../../../libs/services/customer-service.service';
import { Router } from '@angular/router';
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
import { TreeGridFilteringStrategy } from 'igniteui-angular';

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
  selectedIndCustomer !: IndividualCustomers ;
  selectedCorpCustomers !: CorporateCustomers;
  customerInfos : boolean = false;
  serviceSelection !: Observable<Service[]>
  indCustomerSelection !: Observable<IndividualCustomers[]>
  corpCustomerSelection !: Observable<CorporateCustomers[]>
  serviceSave  !: Service[];
  indCustomerSave  !: IndividualCustomers[];
  corpCustomerSave  !: CorporateCustomers[];
  deneme !: CorporateCustomers;
  deneme3 !: Invoice;
  deneme2 !: IndividualCustomers;
  subscriptionId !: number;
  

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



  constructor(private servicesService : ServicesService, private store : Store, private router: Router, private customerService : CustomerServiceService, private toastr : ToastrService) { }

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

    this.corporateForm.reset();
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

    this.selectedIndCustomer = this.individualForm.value as IndividualCustomers
    

    this.onSubmitIndividual();
   }

   addCorpCustomer(){
    if (this.corporateForm.invalid) {
      return;
    }

    this.store.dispatch(addCorpCustomer({
      customer: this.corporateForm.value as CorporateCustomers
    }));

    this.selectedCorpCustomers = this.corporateForm.value as CorporateCustomers

    this.onSubmitCorporate();
   }


   addService(){
    this.servicelist = false
    this.customerInfos = true


    this.store.dispatch(addService({
      service: this.selectedService
    }));

    //this.store.select<Service[]>(selectedService).subscribe(response => this.serviceSave = response)


    //-------------------- Storedan verilerin çekilmesi. Verileri çekmeden önce observable türünde ve data türü olarak customer veya service olmasına göre interface eklemeleri yapıldı.
    this.serviceSelection = this.store.select(serviceSelector)
    this.serviceSelection.subscribe(response => { this.serviceSave = response })

    this.indCustomerSelection = this.store.select(indCustomerSelector)
    this.indCustomerSelection.subscribe(response => {this.indCustomerSave = response})

    this.corpCustomerSelection = this.store.select(corpCustomerSelector)
    this.corpCustomerSelection.subscribe(response => {this.corpCustomerSave = response})
   }


   saveCustomer(){
    if(this.corpCustomerSave.length > 0){
      const customerId = Math.round(Math.random()*100);

      this.customerService.addCorporateCustomer({...this.corpCustomerSave[0], customerId: customerId})
      .subscribe(response => {
        this.deneme = response;
        this.toastr.success('Customer başarıyla eklendi')
      }, this.catchError)

      this.customerService.addSubscriptions(customerId, this.selectedService.id)
        .subscribe(response => {
          this.toastr.success('Subscription başarıyla eklendi')
          this.customerService.addInvoices(response.id).subscribe(response => {
            this.deneme3 = response
            this.toastr.success('Invoice başarıyla eklendi')
            this.corpCustomerSave = [];
          }, this.catchError)
        }, this.catchError);
        
    }
    else if(this.indCustomerSave.length > 0){
      
      const customerId = Math.round(Math.random()*100);

      this.customerService.addIndividualCustomer({...this.indCustomerSave[0], customerId: customerId})
      .subscribe(response => {
        this.deneme2 = response
        this.toastr.success('Customer başarıyla eklendi')
      }, this.catchError)

       this.customerService.addSubscriptions(customerId, this.selectedService.id)
        .subscribe(response => {
          this.toastr.success('Subscription başarıyla eklendi');
          this.customerService.addInvoices(response.id).subscribe(response => {
            this.deneme3 = response;
            this.toastr.success('Invoice başarıyla eklendi')
            this.indCustomerSave = [];
          }, this.catchError)
        }, this.catchError);
        
    }
  
  }

  catchError(error: Error) {
    this.toastr.success('Bir hata olustu ' + error.message)
  }
  
}




