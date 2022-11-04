import { CorporateCustomers } from './../../../../libs/models/corporateCustomers';
import { IndividualCustomers } from './../../../../libs/models/individualCustomers';
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
  details !: CorporateCustomers | IndividualCustomers;

  constructor(private customerServiceService : CustomerServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.route.params.subscribe(params => {
      this.id = +params['id']; 
   });
  }
 

  

}
