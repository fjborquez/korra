import {Routes} from '@angular/router';
import {Login} from './sections/login/login';
import {Dashboard} from './dashboard';
import {Houses} from './houses';
import {ProductDetail} from './product-detail';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: Login},
  {path: 'dashboard', component: Dashboard},
  {path: 'houses', component: Houses},
  {path: 'product/:id', component: ProductDetail}
];
