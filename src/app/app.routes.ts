import { Inventory } from './sections/inventory/inventory';
import {Routes} from '@angular/router';
import {Login} from './sections/login/login';
import {Houses} from './sections/houses/houses';
import {ProductDetail} from './product-detail';
import { AuthGuard } from './auth.guard';
import { LoadingLogin } from './sections/loading-login/loading-login';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: Login},
  {path: 'loading-login', component: LoadingLogin},
  {path: 'inventory', component: Inventory, canActivate: [AuthGuard]},
  {path: 'houses', component: Houses, canActivate: [AuthGuard]},
  {path: 'product/:id', component: ProductDetail, canActivate: [AuthGuard]}
];
