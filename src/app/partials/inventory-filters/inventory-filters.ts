import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, signal, OnChanges, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { animate } from 'motion';
import { getTranslatedCategory } from '../../functions/get-translated-category.function';

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
export class InventoryFilters implements OnChanges {
  @Input() status: string[] = [];
  @Input() categories: string[] = [];
  @Input() refreshFilters = false;
  @Output() filterByStatus = new EventEmitter<string>();
  @Output() filterByCategory = new EventEmitter<string>();

  clickedStatus = 'all';
  clickedCategory = '';
  isCategoryDropdownOpen = signal(false);

  ngOnChanges(changes: SimpleChanges) {
    const refreshFilters = changes['refreshFilters'];

    if (!refreshFilters?.currentValue) {
      this.selectStatus('all');
      this.selectCategory('');
      this.refreshFilters = false;
    }
  }

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
    return getTranslatedCategory(category);
  }
}
