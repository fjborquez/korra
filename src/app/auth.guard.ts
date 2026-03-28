import { LoginService } from './services/login.service';
import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private loginService: LoginService = inject(LoginService);
  private router: Router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {
      if (this.loginService.isLoggedIn() && this.loginService.isUser()) {
        return true;
      }

      this.router.navigate(['/login']);
      return false;
  }

}
