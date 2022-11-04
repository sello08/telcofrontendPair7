import { IndividualCustomers } from './../../../libs/models/individualCustomers';
import { Router } from '@angular/router';
import { CustomerServiceService } from './../../../libs/services/customer-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-individual-customers',
  templateUrl: './individual-customers.component.html',
  styleUrls: ['./individual-customers.component.css']
})
export class IndividualCustomersComponent implements OnInit {
  searchFName !: string;
  searchLName !: string;
  searchNationId !: number;
 individualCustomers : IndividualCustomers[] = [];
  
  constructor(private customerServiceService : CustomerServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getCustomers();
  }
  getCustomers(){
    this.customerServiceService.getIndividualCustomers().subscribe(respond => this.individualCustomers = respond);
  }
  showDetails(id: number){
    this.router.navigate(['/individualCustomer/details', id])
  }
}
