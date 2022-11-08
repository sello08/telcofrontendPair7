import { CorporateCustomers } from './../../../libs/models/corporateCustomers';
import { IndividualCustomers } from '../../../libs/models/individualCustomers';
import { createAction, props} from '@ngrx/store';


export const addIndCustomer = createAction('ADD INDCUSTOMER', props<{customer:IndividualCustomers}>()) 


export const addCorpCustomer = createAction('ADD CORPCUSTOMER', props<{customer:CorporateCustomers}>()) 