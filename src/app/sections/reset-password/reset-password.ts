import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../services/login.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPassword {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private loginService = inject(LoginService);
  private activatedRoute = inject(ActivatedRoute);

  resetForm = this.fb.group({
    email: ['usuario@korra.cl', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    const email = this.resetForm.get('email')?.value;
    const password = this.resetForm.get('password')?.value;

    this.activatedRoute.queryParams.pipe(
      tap(params => params['token']),
      switchMap(token => this.loginService.resetPassword({ email: email, password: password, token: token['token'] }))
    ).subscribe(() => this.router.navigate(['/login']));
  }

  back() {
    this.router.navigate(['/login']);
  }
}
