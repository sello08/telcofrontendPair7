import { CorporateCustomers } from './../../../../libs/models/corporateCustomers';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerServiceService } from './../../../../libs/services/customer-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
 
  id !: number ;
  details !: CorporateCustomers;

  constructor(private customerServiceService : CustomerServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.route.params.subscribe(params => {
     this.customerServiceService.getCorporateCustomerDetail(+params['id']).subscribe(response => this.details = response[0])
    
     
   });
  }
}
