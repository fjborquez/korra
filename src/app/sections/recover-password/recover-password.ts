import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './recover-password.html',
  styleUrls: ['./recover-password.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecoverPasssword {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private loginService = inject(LoginService);

  recoveryForm = this.fb.group({
    email: ['usuario@korra.cl', [Validators.required, Validators.email]],
  });

  onSubmit() {
    const email = this.recoveryForm.get('email')?.value;
    this.loginService.recoverPassword({ email }).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  back() {
    this.router.navigate(['/login']);
  }
}
