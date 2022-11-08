import { CreateCustomerComponent } from './features/create-customer/create-customer.component';
import { CustomersComponent } from './features/customers/customers.component';
import { CorporateCustomersComponent } from './features/corporate-customers/corporate-customers.component';
import { CustomerDetailsComponent } from './features/customer-details/customer-details/customer-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/libs/guards/login.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { IndividualCustomersComponent } from './features/individual-customers/individual-customers.component';
import { IndividualDetailsComponent } from './features/individual-details/individual-details.component';


const routes: Routes = [
  {
    
    path: "",
    component:HomeComponent
  },
  {

    path: "auth",
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)

  },
  {

    path: "services",
    loadChildren: () => import('./features/service/service.module').then(m => m.ServiceModule)
    ,canActivate:[LoginGuard]
  },
  {
    path: "",
    loadChildren: () => import('./features/service/service.module').then(m => m.ServiceModule),
  
  },
  {
    path: "products",
    loadChildren: () => import('./features/product/product.module').then(m => m.ProductModule)
  },
  
  {
    path: "corporate-customers", component: CorporateCustomersComponent,canActivate:[LoginGuard]
  },
  {
    path: "customers", component: CustomersComponent,canActivate:[LoginGuard]
  },
  {
    path: "individual-customers", component: IndividualCustomersComponent,canActivate:[LoginGuard]
  },
  {
    path: "corporateCustomer/details/:id", component: CustomerDetailsComponent,canActivate:[LoginGuard]
  },
  {
    path: "individualCustomer/details/:id", component: IndividualDetailsComponent,canActivate:[LoginGuard]
  },
  {
    path: "customer/create", component: CreateCustomerComponent,canActivate:[LoginGuard]
  },
  {
    path: "categories",
    loadChildren: () => import('./features/categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path:"**",
    component:NotFoundComponent
  }



   
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
