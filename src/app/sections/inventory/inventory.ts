import { ChangeDetectionStrategy, Component, effect, inject, Signal, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { InventoryFilters } from "../../partials/inventory-filters/inventory-filters";
import { InventoryProduct as ProductInInventory } from "../../interfaces/inventory-product.interface";
import { InventoryService } from '../../services/inventory.service';
import { SmartInsight } from "../../partials/smart-insight/smart-insight";
import { LoginService } from '../../services/login.service';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { tap } from 'rxjs';
import { InventoryProduct } from '../../partials/inventory-product/inventory-product';
import { InventoryProductStatus } from '../../interfaces/inventory-product-status.interface';
import { Response } from '../../interfaces/response.interface';
import { Statistics } from '../../interfaces/statistics.interface';
import { InventoryForm } from '../../partials/inventory-form/inventory-form';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, InventoryProduct, InventoryFilters, SmartInsight, InventoryForm],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Inventory {
  loginService: LoginService = inject(LoginService);
  inventoryService = inject(InventoryService);
  houseId = inject(ROUTER_OUTLET_DATA) as Signal<number>;
  products = signal<ProductInInventory[]>([]);
  categories = signal<string[]>([]);
  immediatlyAttention = signal<ProductInInventory[]>([]);
  status = signal<string[]>([]);
  statistics = signal<Statistics | null>(null);
  productsToShow = signal<ProductInInventory[]>([]);
  refreshFilters = false;
  statusFilter = 'all';
  categoryFilter = '';
  isLoading = signal(true);
  showInventoryForm = signal(false);

  constructor() {
    effect(() => {
      if (this.houseId()) {
        this.isLoading.set(true);
        this.getList().subscribe(() => this.refreshFilters = true);
      }
    });
  }

  filterByStatusChanged(aStatus: string) {
    this.statusFilter = aStatus;
    this.filter();
  }

  filterByCategoryChanged(aCategory: string) {
    this.categoryFilter = aCategory;
    this.filter();
  }

  filter() {
    if (this.statusFilter === 'all' && this.categoryFilter === '') {
      this.productsToShow.set(this.products());
    } else {
      if (this.categoryFilter === '' && this.statusFilter !== 'all') {
        this.productsToShow.set(this.products().filter((product: ProductInInventory) => product.product_status.find((status: InventoryProductStatus) => status.pivot?.is_active === 1)?.description  === this.statusFilter));
      } else if (this.categoryFilter !== '' && this.statusFilter === 'all') {
        this.productsToShow.set(this.products().filter((product: ProductInInventory) => product.category_name === this.categoryFilter));
      } else if (this.categoryFilter !== '' && this.statusFilter !== 'all') {
        this.productsToShow.set(this.products().filter((product: ProductInInventory) => product.category_name === this.categoryFilter && product.product_status.find((status: InventoryProductStatus) => status.pivot?.is_active === 1)?.description  === this.statusFilter));
      }
    }
  }

  getList() {
    const userId = this.loginService.getUserId();
    const houseId = this.houseId();

    return this.inventoryService.list(userId, houseId).pipe(
      tap((response: Response) => {
        const products: ProductInInventory[] = response.message.inventory as ProductInInventory[];
        const statistics: Statistics = response.message.statistics as Statistics;
        this.statistics.set(statistics);

        this.products.set(products);
        this.productsToShow.set(products);
        this.categories.set([...new Set(products.map((product: ProductInInventory) => product.category_name))]);
        this.immediatlyAttention.set(products.filter((product: ProductInInventory) =>
          product.product_status.find((status: InventoryProductStatus) => status.pivot?.is_active === 1)?.description === 'Approaching Expiry' ||
          product.product_status.find((status: InventoryProductStatus) => status.pivot?.is_active === 1)?.description === 'Expired'
        ));
        this.status.set([...new Set(products.map((product: ProductInInventory) => product.product_status.find((status: InventoryProductStatus) =>
          status.pivot?.is_active === 1)?.description ?? ''))]);
        this.isLoading.set(false);
      }));
  }

  refreshList() {
    this.getList().subscribe(() => this.filter());
  }

  saveProduct() {
    setTimeout(() => {
      this.showInventoryForm.set(false);
      this.refreshList();
    }, 2000);
  }
}
