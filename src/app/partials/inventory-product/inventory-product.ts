import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../services/inventory.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-inventory-product',
  imports: [MatIconModule, RouterLink, CommonModule],
  templateUrl: './inventory-product.html',
  styleUrl: './inventory-product.css',
})
export class InventoryProduct implements OnInit {
  inventoryService: InventoryService = inject(InventoryService);
  loginService: LoginService = inject(LoginService);

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  consume(product: any) {
    const userId = this.loginService.getUserId();
    this.inventoryService.consume(userId, 1, product.id).subscribe();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  discard(product: any) {
    const userId = this.loginService.getUserId();
    this.inventoryService.discard(userId, 1, product.id).subscribe();
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

  getStatusTranslation(status: string) {
    let translation = '';

    if (status === 'Fresh') {
      translation = 'Fresco';
    } else if (status === 'Approaching Expiry') {
      translation = 'Caduca pronto';
    } else if (status === 'Undefined') {
      translation = 'Indefinido';
    } else if (status === 'Expired') {
      translation = 'Caducado';
    }

    return translation;
  }
}
