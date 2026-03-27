import { Inventory } from './sections/inventory/inventory';
import {Routes} from '@angular/router';
import {Login} from './sections/login/login';
import {Houses} from './houses';
import {ProductDetail} from './product-detail';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: Login},
  {path: 'inventory', component: Inventory},
  {path: 'houses', component: Houses},
  {path: 'product/:id', component: ProductDetail}
];
