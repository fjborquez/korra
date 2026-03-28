import { Component, Input, OnInit, signal } from '@angular/core';
import { InventoryItem } from '../../larder.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory-product',
  imports: [MatIconModule, RouterLink, CommonModule],
  templateUrl: './inventory-product.html',
  styleUrl: './inventory-product.css',
})
export class InventoryProduct implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() product: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentStatus: any = signal('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  statusBgColor: any = signal('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  statusColor: any = signal('');

  ngOnInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.currentStatus.set(this.product.product_status.find((status: any) => status.pivot.is_active === 1).description);
    this.statusBgColor.set(this.getStatusBgColor(this.currentStatus()));
    this.statusColor.set(this.getStatusColor(this.currentStatus()));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isExpiringSoon(product: any): boolean {
    const diff = new Date(product.expiration_date).getTime() - Date.now();
    return diff < 3 * 24 * 60 * 60 * 1000;
  }

  consume() {
    // Logic to update quantity
  }

  remove(item: InventoryItem) {
    //this.larder.removeItem(item.id);
  }

  getStatusBgColor(status: string) {
    let color = '';

    if (status === 'Fresh') {
      color = 'green';
    } else if (status === 'Approaching Expiry') {
      color = '#ff8f00';
    } else if (status === 'Undefined') {
      color = 'black';
    } else if (status === 'Expired') {
      color = 'red';
    }

    return color;
  }

  getStatusColor(status: string) {
    let color = 'black';

    if (status === 'Fresh' || status === 'Undefined') {
      color = 'white';
    }

    return color;
  }
}
