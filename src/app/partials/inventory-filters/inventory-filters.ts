import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { animate } from 'motion';

@Component({
  selector: 'app-inventory-filters',
  imports: [MatIconModule, CommonModule],
  templateUrl: './inventory-filters.html',
  styleUrl: './inventory-filters.css',
  styles: [`
    :host { display: block; }
    .rotate-180 { transform: rotate(180deg); }
  `]
})
export class InventoryFilters {
  @Input() status = [];
  @Input() categories = [];
  @Output() filterByStatus = new EventEmitter<string>();
  @Output() filterByCategory = new EventEmitter<string>();


  clickedStatus = 'all';
  clickedCategory = '';
  isCategoryDropdownOpen = signal(false);

  selectStatus(aStatus: string) {
    this.clickedStatus = aStatus;
    this.filterByStatus.emit(aStatus);
  }

  getTranslatedStatus(aStatus: string) {
    switch (aStatus) {
      case 'Fresh':
        return 'Fresco';
      case 'Approaching Expiry':
        return 'Caduca pronto';
      case 'Expired':
        return 'Caducado';
      case 'Undefined':
        return 'Indefinido';
      default:
        return '';
    }
  }

  toggleCategoryDropdown() {
    const isOpen = this.isCategoryDropdownOpen();
    this.isCategoryDropdownOpen.set(!isOpen);

    if (!isOpen) {
      setTimeout(() => {
        const el = document.getElementById('category-dropdown');
        if (el) {
          animate(el, { opacity: [0, 1], y: [-10, 0] }, { duration: 0.3, ease: 'easeOut' });
        }
      }, 0);
    }
  }

  selectCategory(category: string) {
    this.clickedCategory = category;
    this.filterByCategory.emit(category);
    this.closeCategoryDropdown();
  }

  closeCategoryDropdown() {
    this.isCategoryDropdownOpen.set(false);
  }

  getTranslatedCategory(category: string) {
    switch (category) {
      case 'Bakery':
        return 'Panadería';
      case 'Butchery':
        return 'Carnicería';
      case 'Cheeses and Cold Cuts':
        return 'Quesos y embutidos';
      case 'Dairy':
        return 'Lácteos';
      case 'Fruits and Vegetables':
        return 'Frutas y verduras';
      case 'Flours':
        return 'Harinas';
      case 'Oils, Salt, and Seasonings':
        return 'Aceites, sal y condimentos';
      case 'Pasta':
        return 'Pastas';
      case 'Sauces and Dressings':
        return 'Salsas y aderezos';
      case 'Instant and Soups':
        return 'Instant and Soups';
      case 'Beverages':
        return 'Bebidas';
      case 'Alcoholic Beverages':
        return 'Bebidas alcohólicas';
      default:
        return '';
    }
  }
}
