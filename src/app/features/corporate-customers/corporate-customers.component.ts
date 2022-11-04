import { CustomerServiceService } from './../../../libs/services/customer-service.service';
import { Router } from '@angular/router';
import { CorporateCustomers } from './../../../libs/models/corporateCustomers';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-corporate-customers',
  templateUrl: './corporate-customers.component.html',
  styleUrls: ['./corporate-customers.component.css']
})
export class CorporateCustomersComponent implements OnInit {

  corporateCustomers : CorporateCustomers[] = [];
  searchName !: string;
  searchTax !: number;
  
  constructor(private customerServiceService : CustomerServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.customerServiceService.getCorporateCustomers().subscribe(respond => this.corporateCustomers = respond)
  }
}
