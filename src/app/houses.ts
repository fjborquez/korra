import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LarderService } from './larder.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-houses',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  template: `
    <div class="min-h-screen bg-surface">
      <!-- Sidebar (Same as Dashboard) -->
      <aside class="h-full w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant/10 flex flex-col py-8 justify-between z-40 hidden md:flex">
        <div class="flex flex-col">
          <div class="flex items-center gap-3 px-6 mb-8">
            <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
              <mat-icon>kitchen</mat-icon>
            </div>
            <div>
              <h2 class="text-lg font-black text-primary leading-tight">The Larder</h2>
              <p class="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">Inventory Manager</p>
            </div>
          </div>

          <nav class="space-y-1">
            <a routerLink="/dashboard" routerLinkActive="bg-primary/10 text-primary border-r-4 border-primary" class="flex items-center gap-3 px-6 py-3 text-on-surface-variant font-headline text-sm font-semibold transition-all">
              <mat-icon>inventory_2</mat-icon>
              Inventory
            </a>
            <a routerLink="/houses" routerLinkActive="bg-primary/10 text-primary border-r-4 border-primary" class="flex items-center gap-3 px-6 py-3 text-on-surface-variant font-headline text-sm font-semibold transition-all">
              <mat-icon>home_work</mat-icon>
              Houses
            </a>
          </nav>
        </div>

        <div class="flex flex-col pt-4 border-t border-outline-variant/10">
          <button class="mx-4 mb-6 py-3 bg-primary text-on-primary rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
            <mat-icon class="text-sm">add_home</mat-icon>
            Add House
          </button>
          <a href="javascript:void(0)" class="text-on-surface-variant px-6 py-3 hover:bg-surface-container-high rounded-lg flex items-center gap-3 font-headline text-sm font-semibold transition-all">
            <mat-icon>settings</mat-icon>
            Settings
          </a>
          <a href="javascript:void(0)" class="text-on-surface-variant px-6 py-3 hover:bg-surface-container-high rounded-lg flex items-center gap-3 font-headline text-sm font-semibold transition-all">
            <mat-icon>help</mat-icon>
            Help
          </a>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="md:pl-64 pt-16 px-6 md:px-10">
        <!-- Top Bar -->
        <header class="h-16 fixed top-0 right-0 left-0 md:left-64 bg-surface/80 backdrop-blur-xl z-30 flex items-center justify-between px-6 md:px-10 border-b border-outline-variant/5">
          <div class="flex items-center gap-4">
            <h1 class="text-xl font-extrabold text-primary font-headline tracking-tight">Digital Larder</h1>
          </div>
          <div class="flex items-center gap-4">
            <div class="relative hidden sm:block">
              <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</mat-icon>
              <input class="pl-10 pr-4 py-2 bg-surface-container-high border-none rounded-full text-sm focus:ring-2 focus:ring-primary w-64 transition-all" placeholder="Buscar en la despensa..." type="text">
            </div>
            <button class="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors relative">
              <mat-icon>notifications</mat-icon>
              <span class="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <div class="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/20">
              <img src="https://i.pravatar.cc/150?u=user" alt="User" class="w-full h-full object-cover">
            </div>
          </div>
        </header>

        <div class="max-w-6xl mx-auto py-10">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span class="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">Gestión de Inmuebles</span>
              <h1 class="text-4xl md:text-5xl font-extrabold text-on-surface font-headline tracking-tight">Mis Casas</h1>
            </div>
            <button class="inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-full font-bold text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <mat-icon>add_circle</mat-icon>
              Añadir Casa
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            @for (house of larder.allHouses(); track house.id) {
              <div class="group relative bg-surface-container-lowest rounded-[2.5rem] p-8 shadow-sm border border-transparent hover:border-primary/10 transition-all overflow-hidden flex flex-col">
                <!-- Status Indicator Bar -->
                <div 
                  class="absolute left-0 top-12 bottom-12 w-1.5 rounded-r-full"
                  [class.bg-secondary]="house.isDefault"
                  [class.bg-outline-variant]="!house.isDefault"
                ></div>

                <div class="flex justify-between items-start mb-6">
                  <div class="h-16 w-16 rounded-2xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <mat-icon class="text-3xl">{{ house.type === 'home' ? 'home_work' : 'beach_access' }}</mat-icon>
                  </div>
                  @if (house.isDefault) {
                    <div class="flex items-center gap-2 bg-secondary/10 px-3 py-1.5 rounded-full">
                      <mat-icon class="text-secondary text-sm" style="font-variation-settings: 'FILL' 1;">verified</mat-icon>
                      <span class="text-[10px] font-bold text-on-secondary-container uppercase tracking-wider">Por defecto</span>
                    </div>
                  }
                </div>

                <div class="mb-6">
                  <h3 class="text-2xl font-bold text-on-surface mb-1 font-headline">{{ house.name }}</h3>
                  <div class="flex items-center gap-1 text-on-surface-variant">
                    <mat-icon class="text-base">location_on</mat-icon>
                    <span class="text-sm font-medium">{{ house.location }}</span>
                  </div>
                </div>

                <div class="space-y-4 mb-8">
                  <p class="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Residentes</p>
                  <div class="flex flex-wrap gap-2">
                    @for (res of house.residents; track res.name) {
                      <div class="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/10">
                        <div class="h-5 w-5 rounded-full overflow-hidden bg-slate-300">
                          <img [src]="res.avatar" [alt]="res.name" class="object-cover h-full w-full">
                        </div>
                        <span class="text-xs font-semibold text-on-surface">{{ res.name }}</span>
                      </div>
                    }
                    <div class="flex items-center justify-center h-8 w-8 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-bold">
                      +2
                    </div>
                  </div>
                </div>

                <div class="mt-auto grid grid-cols-2 gap-3 pt-6 border-t border-surface-container-high">
                  <button class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-primary bg-primary/5 hover:bg-primary hover:text-on-primary transition-all">
                    <mat-icon class="text-lg">edit_square</mat-icon>
                    Editar
                  </button>
                  <button class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-error/60 hover:text-error hover:bg-error/5 transition-all">
                    <mat-icon class="text-lg">delete</mat-icon>
                    Eliminar
                  </button>
                </div>
              </div>
            }

            <!-- Add New Placeholder Card -->
            <div class="group relative border-2 border-dashed border-outline-variant/30 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer min-h-[400px]">
              <div class="h-16 w-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <mat-icon class="text-4xl">add_home</mat-icon>
              </div>
              <h3 class="text-lg font-bold text-on-surface-variant group-hover:text-primary">Registrar Nueva Casa</h3>
              <p class="text-xs text-on-surface-variant/60 mt-2 max-w-[150px]">Configura una nueva ubicación para gestionar tu inventario.</p>
            </div>
          </div>

          <!-- Bottom Bento -->
          <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="md:col-span-2 bg-gradient-to-br from-primary to-primary-container rounded-[2.5rem] p-10 text-on-primary relative overflow-hidden shadow-2xl shadow-primary/30">
              <div class="relative z-10 flex flex-col h-full">
                <span class="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mb-6">Sincronización Total</span>
                <h2 class="text-4xl font-bold font-headline mb-4">Gestión Multi-hogar simplificada</h2>
                <p class="text-on-primary-container/80 text-base max-w-md mb-8 leading-relaxed">Controla la caducidad de tus productos en tiempo real, sin importar si estás en tu residencia habitual o de vacaciones. Comparte listas con tus convivientes instantáneamente.</p>
                <div class="mt-auto flex items-center gap-4">
                  <div class="flex -space-x-3">
                    <div class="h-10 w-10 rounded-full border-2 border-primary bg-white/20 backdrop-blur-sm"></div>
                    <div class="h-10 w-10 rounded-full border-2 border-primary bg-white/20 backdrop-blur-sm"></div>
                    <div class="h-10 w-10 rounded-full border-2 border-primary bg-white/20 backdrop-blur-sm"></div>
                  </div>
                  <span class="text-xs font-medium">+15 familias activas hoy</span>
                </div>
              </div>
              <div class="absolute -right-20 -bottom-20 h-64 w-64 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            <div class="bg-secondary-container rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center shadow-lg shadow-secondary/10">
              <div class="h-20 w-20 bg-secondary rounded-3xl flex items-center justify-center text-on-secondary mb-6 shadow-xl shadow-secondary/20">
                <mat-icon class="text-4xl">eco</mat-icon>
              </div>
              <h3 class="text-xl font-bold text-on-secondary-container font-headline mb-2">Impacto Residuo Cero</h3>
              <p class="text-on-secondary-container/70 text-sm">Has reducido un <span class="font-bold">12%</span> el desperdicio de comida este mes.</p>
              <div class="w-full mt-8 h-3 bg-white/30 rounded-full overflow-hidden">
                <div class="h-full w-[12%] bg-secondary rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Houses {
  larder = inject(LarderService);
}
