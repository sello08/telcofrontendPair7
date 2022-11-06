import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  isModalOpen : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  creatingCustomer(){
    this.isModalOpen = true;
  }
}
