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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectStatus(aStatus: any) {
    this.clicked = aStatus;
    this.filterByStatus.emit(aStatus);
  }
}
