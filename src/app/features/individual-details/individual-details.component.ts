import { Router, ActivatedRoute } from '@angular/router';
import { IndividualCustomers } from './../../../libs/models/individualCustomers';
import { CustomerServiceService } from './../../../libs/services/customer-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-individual-details',
  templateUrl: './individual-details.component.html',
  styleUrls: ['./individual-details.component.css']
})
export class IndividualDetailsComponent implements OnInit {

  id !: number ;
  details !: IndividualCustomers;

  constructor(private customerServiceService : CustomerServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.route.params.subscribe(params => {
     this.customerServiceService.getIndividualCustomerDetail(+params['id']).subscribe(response => this.details = response[0])
   });
  }
}
