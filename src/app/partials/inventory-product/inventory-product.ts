import { Component, inject, Input, OnInit, Output, Signal, signal, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ROUTER_OUTLET_DATA, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../services/inventory.service';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InventoryProduct as ProductInInventory } from '../../interfaces/inventory-product.interface';
import { InventoryProductStatus } from '../../interfaces/inventory-product-status.interface';
import { getTranslatedCategory } from '../../functions/get-translated-category.function'


@Component({
  selector: 'app-inventory-product',
  imports: [MatIconModule, RouterLink, CommonModule],
  templateUrl: './inventory-product.html',
  styleUrl: './inventory-product.css',
})
export class InventoryProduct implements OnInit {
  inventoryService: InventoryService = inject(InventoryService);
  loginService: LoginService = inject(LoginService);
  matSnackBar: MatSnackBar = inject(MatSnackBar);

  @Input() product!: ProductInInventory;
  @Output() refreshList = new EventEmitter<void>();
  currentStatus = signal<string>('');
  statusBgColor = signal<string>('');
  statusColor = signal<string>('');
  houseId = inject(ROUTER_OUTLET_DATA) as Signal<number>;
  expirationDate!: Date;
  purchaseDate!: Date;

  modalState = signal<{
    isOpen: boolean;
    type: 'consume' | 'discard' | null;
    item: ProductInInventory | null;
  }>({
    isOpen: false,
    type: null,
    item: null
  });

  ngOnInit(): void {
    this.currentStatus.set(this.product.product_status?.find((status: InventoryProductStatus) => status.pivot?.is_active === 1)?.description ?? '');
    this.statusBgColor.set(this.getStatusBgColor(this.currentStatus()));
    this.statusColor.set(this.getStatusColor(this.currentStatus()));

    if (this.product.expiration_date) {
      this.expirationDate = new Date(this.product.expiration_date);
    }

    if (this.product.purchase_date) {
      this.purchaseDate = new Date(this.product.purchase_date);
    }
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

  openModal(type: 'consume' | 'discard', item: ProductInInventory) {
    this.modalState.set({ isOpen: true, type, item });
  }

  closeModal() {
    this.modalState.set({ isOpen: false, type: null, item: null });
  }

  confirmAction() {
    const state = this.modalState();
    const userId = this.loginService.getUserId();
    const houseId = this.houseId();
    const product: ProductInInventory | null = state.item;

    if (!product) {
      this.closeModal();
      return;
    }

    if (state.type === 'discard') {
      this.inventoryService.discard(userId, houseId, product.id).subscribe({
        error: () => {
          this.matSnackBar.open('No se pudo marcar el producto como descartado', 'Cerrar', {
            duration: 3000,
            panelClass: ['custom-mat-snackbar']
          });
          this.refreshList.emit();
          this.closeModal();
        },
        next: () => {
          this.matSnackBar.open('Producto marcado como descartado', 'Cerrar', {
            duration: 3000,
            panelClass: ['custom-mat-snackbar']
          });
          this.refreshList.emit();
          this.closeModal();
        },
      });

      return;
    }

    if (state.type === 'consume') {
      this.inventoryService.consume(userId, houseId, product.id).subscribe({
        error: () => {
          this.matSnackBar.open('No se pudo marcar el producto como consumido', 'Cerrar', {
            duration: 3000,
            panelClass: ['custom-mat-snackbar']
          });
          this.refreshList.emit();
          this.closeModal();
        },
        next: () => {
          this.matSnackBar.open('Producto marcado como consumido', 'Cerrar', {
            duration: 3000,
            panelClass: ['custom-mat-snackbar']
          });
          this.refreshList.emit();
          this.closeModal();
        },
      });

      return;
    }
  }

  getTranslatedCategory(category: string) {
    return getTranslatedCategory(category);
  }
}
