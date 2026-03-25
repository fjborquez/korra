import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <div class="min-h-screen flex items-center justify-center relative overflow-hidden bg-surface">
      <!-- Background Decoration -->
      <div class="absolute inset-0 z-0">
        <div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary-container/20 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-container/10 rounded-full blur-[120px]"></div>
        <img 
          src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=2000" 
          alt="Kitchen Background" 
          class="w-full h-full object-cover opacity-10 mix-blend-multiply"
          referrerpolicy="no-referrer"
        >
      </div>

      <!-- Main Content Container -->
      <main class="relative z-10 w-full max-w-[440px] px-6 py-12">
        <!-- Brand Header -->
        <div class="flex flex-col items-center mb-10">
          <div class="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary/20">
            <mat-icon class="text-on-primary text-4xl h-auto w-auto">kitchen</mat-icon>
          </div>
          <h1 class="font-headline text-3xl font-extrabold tracking-tight text-primary">Digital Larder</h1>
          <p class="text-on-surface-variant font-medium mt-2">Simplify your kitchen inventory</p>
        </div>

        <!-- Login Card -->
        <div class="bg-surface-container-lowest rounded-[2rem] p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-outline-variant/10">
          <div class="mb-8">
            <h2 class="font-headline text-2xl font-bold text-on-surface">Welcome back</h2>
            <p class="text-on-surface-variant text-sm mt-1">Please enter your details to sign in</p>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Email Field -->
            <div class="space-y-2">
              <label class="font-sans text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1" for="email">Email Address</label>
              <div class="relative">
                <input 
                  formControlName="email"
                  class="w-full bg-surface-container-high border-none rounded-xl px-5 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all" 
                  id="email" 
                  placeholder="hello@example.com" 
                  type="email"
                >
                <mat-icon class="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl h-auto w-auto">mail</mat-icon>
              </div>
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
              <div class="flex justify-between items-center ml-1">
                <label class="font-sans text-xs font-bold uppercase tracking-widest text-on-surface-variant" for="password">Password</label>
                <a class="text-primary text-xs font-bold hover:underline" href="javascript:void(0)">Forgot password?</a>
              </div>
              <div class="relative">
                <input 
                  formControlName="password"
                  class="w-full bg-surface-container-high border-none rounded-xl px-5 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all" 
                  id="password" 
                  placeholder="••••••••" 
                  type="password"
                >
                <mat-icon class="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl h-auto w-auto">lock</mat-icon>
              </div>
            </div>

            <!-- Login Button -->
            <button 
              type="submit"
              class="w-full bg-primary text-on-primary font-headline font-bold py-4 rounded-full shadow-lg shadow-primary/25 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Login
              <mat-icon class="text-lg h-auto w-auto">arrow_forward</mat-icon>
            </button>
          </form>
        </div>

        <!-- Footer -->
        <footer class="mt-8 text-center px-4">
          <p class="text-xs text-on-surface-variant/60 leading-relaxed">
            By logging in, you agree to our <a class="underline" href="javascript:void(0)">Terms of Service</a> and <a class="underline" href="javascript:void(0)">Privacy Policy</a>.
          </p>
        </footer>
      </main>

      <!-- Status Indicator -->
      <div class="fixed bottom-10 right-10 hidden lg:block">
        <div class="flex items-center gap-4 bg-surface-container-lowest/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-outline-variant/10">
          <div class="w-3 h-3 rounded-full bg-secondary shadow-[0_0_12px_rgba(0,110,40,0.5)] animate-pulse"></div>
          <div class="flex flex-col">
            <span class="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">System Status</span>
            <span class="font-headline text-xs font-bold text-on-surface">Kitchen Hub Online</span>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['hello@example.com', [Validators.required, Validators.email]],
    password: ['password', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.router.navigate(['/dashboard']);
    }
  }
}
