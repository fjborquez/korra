import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading-login',
  imports: [MatIconModule],
  templateUrl: './loading-login.html',
  styleUrl: './loading-login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingLogin {
  loginService: LoginService = inject(LoginService);
  router: Router = inject(Router);
  statusMessage = signal('Iniciando sesión...');
  progress = signal(0);
  private intervalId: ReturnType<typeof setInterval> | undefined;
  loginInfo = computed(() => this.router.currentNavigation()?.extras.state as { email: string; password: string } | undefined);

  constructor() {
    this.startLoading();
    this.fetchToken();
  }

  private startLoading() {
    this.intervalId = setInterval(() => {
      this.progress.update(p => {
        if (p < 90) {
          // Progress naturally until 90%
          const increment = Math.floor(Math.random() * 5) + 2;
          const next = p + increment;
          this.updateStatusMessage(next);
          return next > 90 ? 90 : next;
        }
        return p; // Wait at 90% for token
      });
    }, 200);
  }

  private updateStatusMessage(p: number) {
    if (p < 30) this.statusMessage.set('Conectando con el servidor...');
    else if (p < 60) this.statusMessage.set('Obteniendo credenciales...');
    else if (p < 90) this.statusMessage.set('Preparando tu inventario...');
    else this.statusMessage.set('Finalizando...');
  }

  private async fetchToken() {
    const email = this.loginInfo()?.email || '';
    const password = this.loginInfo()?.password || '';

    this.loginService.login({
      email: email,
      password: password
    }).subscribe({
      next: () => {
        this.statusMessage.set('¡Sesión iniciada!');
        this.progress.set(100);

        setTimeout(() => {
          this.router.navigate(['/inventory']);
        }, 800);
      }
    });
  }
}
