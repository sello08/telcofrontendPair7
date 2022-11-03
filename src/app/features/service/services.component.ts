

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { touchId } from '@igniteui/material-icons-extended';
import { Service, ServicesService } from 'src/libs';


@Component({
  selector: 'app-services-components',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  services !: Service[] ;
  service !: Service;
  serviceAddForm !: FormGroup;
  error: string = '';

  constructor(private servicesService :ServicesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getServices();
    this.createServiceAddForm
  }
  createServiceAddForm() {
    this.serviceAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  //--------------------------------
add(){
  this.service = {name: ''};
}
update(service: Service){
  this.service = {...service};

}
//----------------------------------
  getServices(): void {

    this.servicesService.getServices().subscribe((response) => {
     
      this.services = response;
    });
  }

addService(service: Service){
    this.servicesService.add(this.service).subscribe({
      next: (response) => {
        console.log(`Service${response} has added`);
      },
      error: (err) => {
        console.log(err);
  
        this.error = err.statusText;
      },
      complete: () => {
        this.getServices();
  }})

  }
deleteService(id: number){
  
    this.servicesService.delete(id).subscribe(() => {this.getServices()})
    
  }
updateService(){    
    if (!this.service.id) {
      return;
    }
    this.servicesService.update( this.service.id , this.service).subscribe({
      next: (response) => {
        console.log(`Service${response} has updated`);
      },
      error: (err) => {
        console.log(err);
  
        this.error = err.statusText;
      },
      complete: () => {

        
        this.getServices();
      
     
  }})
  
  }
}