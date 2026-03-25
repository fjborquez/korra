import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LarderService } from './larder.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  template: `
    <div class="min-h-screen bg-surface">
      <!-- Sidebar (Same as Dashboard) -->
      <aside class="h-full w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant/10 flex flex-col py-8 justify-between z-40 hidden md:flex">
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-3 px-6">
            <div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <mat-icon>kitchen</mat-icon>
            </div>
            <div>
              <h2 class="text-lg font-black text-primary leading-tight">The Larder</h2>
              <p class="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">Editorial Freshness</p>
            </div>
          </div>

          <div class="px-4">
            <span class="px-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Active Property</span>
            <button class="w-full flex items-center justify-between gap-2 px-3 py-2 bg-white border border-outline-variant/20 rounded-lg text-sm font-semibold text-on-surface hover:border-primary transition-all">
              <div class="flex items-center gap-2">
                <mat-icon class="text-primary text-lg">home</mat-icon>
                <span>Home</span>
              </div>
              <mat-icon class="text-on-surface-variant">unfold_more</mat-icon>
            </button>
          </div>

          <nav class="flex flex-col gap-1">
            <a routerLink="/dashboard" class="flex items-center gap-3 px-6 py-3 text-on-surface-variant font-semibold text-sm transition-all">
              <mat-icon>home_work</mat-icon>
              <span>Houses</span>
            </a>
          </nav>
        </div>

        <div class="flex flex-col gap-1">
          <div class="px-6 mb-6">
            <button class="w-full py-2.5 bg-primary text-on-primary rounded-lg font-bold text-sm shadow-sm hover:opacity-90 transition-colors">
              Add Item
            </button>
          </div>
          <a href="javascript:void(0)" class="flex items-center gap-3 px-6 py-3 text-on-surface-variant text-sm font-semibold transition-all">
            <mat-icon class="text-lg">settings</mat-icon>
            <span>Settings</span>
          </a>
          <a href="javascript:void(0)" class="flex items-center gap-3 px-6 py-3 text-on-surface-variant text-sm font-semibold transition-all">
            <mat-icon class="text-lg">help</mat-icon>
            <span>Help</span>
          </a>
        </div>
      </aside>

      <!-- Top Bar -->
      <header class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl h-16 border-b border-outline-variant/5">
        <div class="flex justify-between items-center px-6 h-full w-full max-w-screen-2xl mx-auto md:pl-72">
          <div class="flex items-center gap-4">
            <button routerLink="/dashboard" class="p-2 hover:bg-surface-container-high rounded-lg transition-colors">
              <mat-icon class="text-on-surface-variant">arrow_back</mat-icon>
            </button>
            <span class="text-xl font-extrabold text-primary font-headline tracking-tight">Digital Larder</span>
          </div>
          <div class="flex items-center gap-4">
            <div class="relative hidden md:block w-64">
              <input class="w-full bg-surface-container-high border-none rounded-full py-2 px-4 text-sm focus:ring-2 focus:ring-primary" placeholder="Search inventory..." type="text">
            </div>
            <button class="p-2 hover:bg-surface-container-high transition-colors rounded-lg">
              <mat-icon class="text-on-surface-variant">notifications</mat-icon>
            </button>
            <img src="https://i.pravatar.cc/150?u=user" alt="User" class="w-8 h-8 rounded-full object-cover border-2 border-primary-container">
          </div>
        </div>
      </header>

      <main class="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto md:pl-72 flex flex-col items-center">
        @if (item(); as i) {
          <!-- Hero Product Card -->
          <section class="bg-surface-container-lowest rounded-[2.5rem] overflow-hidden shadow-sm relative w-full max-w-4xl border border-outline-variant/5">
            <div class="absolute top-8 left-0 w-1.5 h-32 bg-secondary rounded-r-full"></div>
            <div class="grid md:grid-cols-2 gap-12 p-10 md:p-16">
              <div class="aspect-square rounded-3xl bg-surface-container-high overflow-hidden group shadow-inner relative">
                <img [src]="i.imageUrl" [alt]="i.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div class="flex flex-col justify-center">
                <div>
                  <span class="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">FRESH</span>
                  <h1 class="text-5xl font-extrabold text-on-surface tracking-tight mb-4 font-headline">{{ i.name }}</h1>
                  <p class="text-on-surface-variant text-base mb-8 leading-relaxed max-w-md">{{ i.description }}</p>
                  <div class="flex items-end gap-2 mb-10">
                    <span class="text-6xl font-black text-primary">{{ i.quantity.split(' ')[0] }}</span>
                    <span class="text-2xl font-medium text-on-surface-variant mb-2">{{ i.quantity.split(' ')[1] }}</span>
                  </div>
                </div>
                <div class="space-y-4 max-w-sm">
                  <button class="w-full py-5 bg-primary text-on-primary rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20">
                    <mat-icon style="font-variation-settings: 'FILL' 1;">remove_circle</mat-icon>
                    Use / Consume
                  </button>
                  <button class="w-full py-4 border-2 border-outline-variant/30 text-error rounded-full font-bold flex items-center justify-center gap-3 hover:bg-error-container/10 transition-all active:scale-95">
                    <mat-icon>delete</mat-icon>
                    Discard Item
                  </button>
                </div>
              </div>
            </div>
          </section>
        }
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetail {
  id = input.required<string>();
  private larderService = inject(LarderService);
  
  item = () => this.larderService.getItemById(this.id());
}
