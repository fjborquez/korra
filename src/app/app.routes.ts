import { Inventory } from './sections/inventory/inventory';
import {Routes} from '@angular/router';
import {Login} from './sections/login/login';
import {Houses} from './houses';
import {ProductDetail} from './product-detail';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: Login},
  {path: 'inventory', component: Inventory, canActivate: [AuthGuard]},
  {path: 'houses', component: Houses, canActivate: [AuthGuard]},
  {path: 'product/:id', component: ProductDetail, canActivate: [AuthGuard]}
];
