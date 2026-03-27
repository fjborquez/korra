import { Component, Input } from '@angular/core';
import { InventoryItem } from '../../larder.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inventory-product',
  imports: [MatIconModule, RouterLink],
  templateUrl: './inventory-product.html',
  styleUrl: './inventory-product.css',
})
export class InventoryProduct {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() product: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isExpiringSoon(product: any): boolean {
    const diff = new Date(product.expiration_date).getTime() - Date.now();
    return diff < 3 * 24 * 60 * 60 * 1000;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getExpiryLabel(product: any): string {
    const diff = new Date(product.expiration_date).getTime() - Date.now();
    if (diff <= 0) return 'Expiring Today';
    const days = Math.ceil(diff / (24 * 60 * 60 * 1000));
    return `Expiring in ${days} days`;
  }

  consume() {
    // Logic to update quantity
  }

  remove(item: InventoryItem) {
    //this.larder.removeItem(item.id);
  }
}
