import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LarderService, InventoryItem } from './larder.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  template: `
    <div class="min-h-screen bg-surface">
      <!-- Sidebar -->
      <aside class="h-full w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant/10 flex flex-col py-8 justify-between z-40 hidden md:flex">
        <div class="flex flex-col">
          <div class="flex items-center gap-3 px-6 mb-8">
            <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
              <mat-icon>kitchen</mat-icon>
            </div>
            <div>
              <h2 class="text-lg font-black text-primary leading-tight">The Larder</h2>
              <p class="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">Editorial Freshness</p>
            </div>
          </div>

          <!-- House Selector -->
          <div class="px-4 mb-6">
            <span class="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5 ml-1">Active House</span>
            <div class="relative group">
              <button class="w-full flex items-center justify-between gap-3 px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/20 rounded-xl hover:border-primary/50 transition-all text-left shadow-sm">
                <div class="flex items-center gap-3 overflow-hidden">
                  <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <mat-icon class="text-primary text-lg">home</mat-icon>
                  </div>
                  <div class="truncate">
                    <p class="text-sm font-bold text-on-surface truncate">{{ larder.activeHouseId() === '1' ? 'Home' : 'Beach House' }}</p>
                    <p class="text-[10px] text-on-surface-variant font-medium truncate">Primary Residence</p>
                  </div>
                </div>
                <mat-icon class="text-on-surface-variant text-sm shrink-0">unfold_more</mat-icon>
              </button>
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
              <input class="pl-10 pr-4 py-2 bg-surface-container-high border-none rounded-full text-sm focus:ring-2 focus:ring-primary w-64 transition-all" placeholder="Search inventory..." type="text">
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

        <!-- Content -->
        <div class="max-w-7xl mx-auto py-10">
          <section class="mb-10">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 class="text-4xl font-extrabold text-on-surface tracking-tight mb-2 font-headline">Freshly Stocked.</h2>
                <p class="text-on-surface-variant max-w-md">You have {{ larder.activeInventory().length }} items across 5 categories. 3 items require your immediate attention.</p>
              </div>
              <button class="bg-primary text-on-primary px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-primary/20">
                <mat-icon>add</mat-icon>
                Add New Item
              </button>
            </div>
          </section>

          <!-- Filters -->
          <div class="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <button class="px-6 py-2.5 bg-primary text-on-primary rounded-full text-sm font-semibold whitespace-nowrap">All Items</button>
            <button class="px-6 py-2.5 bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest transition-colors rounded-full text-sm font-semibold whitespace-nowrap">Expiring Soon</button>
            <button class="px-6 py-2.5 bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest transition-colors rounded-full text-sm font-semibold whitespace-nowrap">Recently Added</button>
            <div class="w-px h-6 bg-outline-variant/30 mx-2"></div>
            <button class="px-6 py-2.5 bg-surface-container-low border border-outline-variant/10 text-on-surface-variant hover:bg-white transition-colors rounded-full text-sm font-semibold flex items-center gap-2 whitespace-nowrap">
              <mat-icon class="text-sm">filter_list</mat-icon>
              Category
            </button>
          </div>

          <!-- Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            @for (item of larder.activeInventory(); track item.id) {
              <div class="bg-surface-container-lowest rounded-3xl p-0 overflow-hidden relative group hover:shadow-xl transition-all duration-300 border border-outline-variant/5">
                <!-- Status Bar -->
                <div 
                  class="absolute left-0 top-0 bottom-0 w-1.5 z-10"
                  [class.bg-error]="isExpiringSoon(item)"
                  [class.bg-secondary]="!isExpiringSoon(item)"
                ></div>
                
                <div class="aspect-[4/3] overflow-hidden relative">
                  <img [src]="item.imageUrl" [alt]="item.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                  @if (isExpiringSoon(item)) {
                    <div class="absolute top-3 right-3">
                      <span class="bg-error-container text-on-error-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 backdrop-blur-md">
                        <mat-icon class="text-xs h-auto w-auto">warning</mat-icon>
                        {{ getExpiryLabel(item) }}
                      </span>
                    </div>
                  }
                </div>

                <div class="p-6">
                  <div class="flex justify-between items-start mb-1">
                    <h3 class="text-xl font-bold text-on-surface leading-tight font-headline">{{ item.name }}</h3>
                    <span class="text-[10px] font-bold text-secondary bg-secondary-container/30 px-2 py-0.5 rounded uppercase tracking-wider">{{ item.category }}</span>
                  </div>
                  <p class="text-on-surface-variant text-sm mb-4">Quantity: {{ item.quantity }}</p>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <button (click)="consume()" class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-colors">
                        <mat-icon class="text-sm">remove</mat-icon>
                      </button>
                      <button (click)="remove(item)" class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-error hover:text-on-error transition-colors">
                        <mat-icon class="text-sm">delete</mat-icon>
                      </button>
                    </div>
                    <a [routerLink]="['/product', item.id]" class="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                      Details
                      <mat-icon class="text-sm">chevron_right</mat-icon>
                    </a>
                  </div>
                </div>
              </div>
            }

            <!-- Smart Insight Card -->
            <div class="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 bg-gradient-to-br from-primary to-primary-container rounded-[2rem] p-8 text-on-primary flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
              <div class="z-10 relative">
                <p class="text-on-primary/70 font-bold text-[10px] uppercase tracking-widest mb-2">Smart Insights</p>
                <h2 class="text-3xl font-extrabold font-headline mb-4 max-w-xs">Reduce your food waste by 15% this month.</h2>
                <button class="bg-white text-primary px-6 py-3 rounded-full text-sm font-bold shadow-xl hover:scale-105 transition-transform">View Weekly Report</button>
              </div>
              <div class="mt-8 md:mt-0 z-10 flex gap-8">
                <div class="text-center">
                  <p class="text-4xl font-black mb-1">24%</p>
                  <p class="text-[10px] font-bold uppercase text-on-primary/60">Waste Reduction</p>
                </div>
                <div class="text-center">
                  <p class="text-4xl font-black mb-1">3d</p>
                  <p class="text-[10px] font-bold uppercase text-on-primary/60">Avg shelf life</p>
                </div>
              </div>
              <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div class="absolute -left-10 -top-10 w-48 h-48 bg-secondary-container/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {
  larder = inject(LarderService);

  isExpiringSoon(item: InventoryItem): boolean {
    const diff = item.expiryDate.getTime() - Date.now();
    return diff < 3 * 24 * 60 * 60 * 1000;
  }

  getExpiryLabel(item: InventoryItem): string {
    const diff = item.expiryDate.getTime() - Date.now();
    if (diff <= 0) return 'Expiring Today';
    const days = Math.ceil(diff / (24 * 60 * 60 * 1000));
    return `Expiring in ${days} days`;
  }

  consume() {
    // Logic to update quantity
  }

  remove(item: InventoryItem) {
    this.larder.removeItem(item.id);
  }
}
