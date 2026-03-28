import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-inventory-filters',
  imports: [MatIconModule, CommonModule],
  templateUrl: './inventory-filters.html',
  styleUrl: './inventory-filters.css',
})
export class InventoryFilters {
  @Input() status = [];
  @Input() categories = [];
  @Output() filterByStatus = new EventEmitter<string>();

  clicked = 'all';

  selectStatus(aStatus: string) {
    this.clicked = aStatus;
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
}
