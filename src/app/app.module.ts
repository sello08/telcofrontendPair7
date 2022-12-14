
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{ HttpClientModule,HTTP_INTERCEPTORS}from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { 
	IgxIconModule,
	IgxNavbarModule,
	IgxButtonModule,
  IgxBadgeModule 
 } from "igniteui-angular";
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor, LoadingService } from 'src/libs';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { LoginService } from 'src/libs';
import { CustomerDetailsComponent } from './features/customer-details/customer-details/customer-details.component';
import { CorporateCustomersComponent } from './features/corporate-customers/corporate-customers.component';
import { IndividualCustomersComponent } from './features/individual-customers/individual-customers.component';
import { FilterNamePipePipe } from './pipes/filter-name-pipe.pipe';
import { TaxNumberPipe } from './pipes/tax-number.pipe';
import { FirstNamePipe } from './pipes/first-name.pipe';
import { LastNamePipe } from './pipes/last-name.pipe';
import { IdPipe } from './pipes/id.pipe';
import { IndividualDetailsComponent } from './features/individual-details/individual-details.component';
import { BirthDatePipe } from './pipes/birth-date.pipe';
import { CustomersComponent } from './features/customers/customers.component';
import { CreateCustomerComponent } from './features/create-customer/create-customer.component';
import { StoreModule } from '@ngrx/store';
import { indCustomerReducer, corpCustomerReducer } from './features/store/reducers/customer.reducer';
import { serviceReducer } from './features/store/reducers/services.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SpinnerComponent,
    NotFoundComponent,
    HomeComponent,
    CustomerDetailsComponent,
    CorporateCustomersComponent,
    IndividualCustomersComponent,
    FilterNamePipePipe,
    TaxNumberPipe,
    FirstNamePipe,
    LastNamePipe,
    IdPipe,
    IndividualDetailsComponent,
    BirthDatePipe,
    CustomersComponent,
    CreateCustomerComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,ReactiveFormsModule,
    HttpClientModule, 
    FormsModule,
    IgxIconModule,
    IgxNavbarModule,
    IgxButtonModule,  
    IgxBadgeModule ,
    StoreModule.forRoot({}),
    StoreModule.forFeature('indCustomer', indCustomerReducer),
    StoreModule.forFeature('corpCustomer', corpCustomerReducer),
    StoreModule.forFeature('service', serviceReducer),
    StoreDevtoolsModule.instrument({
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    ToastrModule.forRoot({
        timeOut:4000,
        progressBar:true,
        closeButton:false,
        progressAnimation:"decreasing",
        preventDuplicates:true,
        positionClass:"toast-bottom-left"
    })
    
    
  ],
  providers: [LoginService,LoadingService,{ provide: HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
