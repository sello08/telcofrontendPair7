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
  searchName !: string;
  searchTax !: number;
  corporateCustomers : CorporateCustomers[] = [];
  
  
  constructor(private customerServiceService : CustomerServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.customerServiceService.getCorporateCustomers().subscribe(respond => this.corporateCustomers = respond)
  }
  showDetails(id: number | undefined){
    this.router.navigate(['/corporateCustomer/details', id])
  }
}
