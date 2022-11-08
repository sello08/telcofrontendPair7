import { CorporateCustomers } from './../../../../libs/models/corporateCustomers';
import { IndividualCustomers } from './../../../../libs/models/individualCustomers';
import { createFeatureSelector, createSelector } from "@ngrx/store";



export const indCustomerSelector = createSelector(
    createFeatureSelector('indCustomer'),
    (state: IndividualCustomers[]) => {
        return state
    }
)


export const corpCustomerSelector = createSelector(
    createFeatureSelector('corpCustomer'),
    (state: CorporateCustomers[]) => {
        return state
    }
)