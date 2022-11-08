import { CorporateCustomers } from '../../../../libs/models/corporateCustomers';
import { Customer } from '../../../../libs/models/customer';
import { IndividualCustomers } from '../../../../libs/models/individualCustomers';
import { on, createReducer } from '@ngrx/store';
import { addCorpCustomer, addIndCustomer } from '../actions/customer.actions';
import { state } from '@angular/animations';


export const initialState : IndividualCustomers[] = [];


export const initialState2 : CorporateCustomers[] = [];



export const indCustomerReducer = createReducer(
    initialState,
    on(addIndCustomer, (state, {customer}) => ([...state, customer]))
)

export const corpCustomerReducer = createReducer(
    initialState2,
    on(addCorpCustomer, (state, {customer}) => ([...state, customer]))
)


