import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private loginService = inject(LoginService);


  loginForm = this.fb.group({
    email: ['usuario@korra.cl', [Validators.required, Validators.email]],
    password: ['password', [Validators.required]]
  });

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/inventory']);
    }
  }

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.router.navigate(['/loading-login'], {
      state: {
        email: email,
        password: password
      }
    });
  }

  onRecoverPassword() {
    this.router.navigate(['/recover-password']);
  }
}
