import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  isModalOpen : boolean = false;

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  creatingCustomer(){
    this.router.navigate(['customer/create'])
  }
}
