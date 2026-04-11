import { Inventory } from './sections/inventory/inventory';
import {Routes} from '@angular/router';
import {Login} from './sections/login/login';
import {Houses} from './sections/houses/houses';
import { AuthGuard } from './auth.guard';
import { LoadingLogin } from './sections/loading-login/loading-login';
import { RecoverPasssword } from './sections/recover-password/recover-password';
import { ResetPassword } from './sections/reset-password/reset-password';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: Login},
  {path: 'loading-login', component: LoadingLogin},
  {path: 'recover-password', component: RecoverPasssword},
  {path: 'reset-password', component: ResetPassword},
  {path: 'inventory', component: Inventory, canActivate: [AuthGuard]},
  {path: 'houses', component: Houses, canActivate: [AuthGuard]},
];
