import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { InventoryFilters } from "../../partials/inventory-filters/inventory-filters";
import { InventoryProduct } from "../../partials/inventory-product/inventory-product";
import { InventoryService } from '../../services/inventory.service';
import { SmartInsight } from "../../partials/smart-insight/smart-insight";
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, InventoryProduct, InventoryFilters, SmartInsight],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Inventory implements OnInit {
  loginService: LoginService = inject(LoginService);
  inventoryService = inject(InventoryService);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any = signal([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any = signal([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  immediatlyAttention: any = signal([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  status: any = signal([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productsToShow: any = signal([]);
  statusFilter = 'all';
  categoryFilter = '';

  ngOnInit() {
    const userId = this.loginService.getUserId();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.inventoryService.list(userId, 1).subscribe((response: any) => {
      this.products.set(response.message);
      this.productsToShow.set(response.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.categories.set([...new Set(response.message.map((product: any) => product.category_name))]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.immediatlyAttention.set(response.message.filter((product: any) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        product.product_status.find((status: any) => status.pivot.is_active === 1).description === 'Approaching Expiry' ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        product.product_status.find((status: any) => status.pivot.is_active === 1).description === 'Expired'
      ));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.status.set([...new Set(response.message.map((product: any) => product.product_status.find((status: any) =>
        status.pivot.is_active === 1).description))]);
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
      if (this.categoryFilter === '' && this.statusFilter === 'all') {
        this.productsToShow.set(this.products());
        return;
      } else if (this.categoryFilter === '' && this.statusFilter !== 'all') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.productsToShow.set(this.products().filter((product: any) => product.product_status.find((status: any) => status.pivot.is_active === 1).description  === this.statusFilter));
      } else if (this.categoryFilter !== '' && this.statusFilter === 'all') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.productsToShow.set(this.products().filter((product: any) => product.category_name === this.categoryFilter));
      } else if (this.categoryFilter !== '' && this.statusFilter !== 'all') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.productsToShow.set(this.products().filter((product: any) => product.category_name === this.categoryFilter && product.product_status.find((status: any) => status.pivot.is_active === 1).description  === this.statusFilter));
      }
    }
  }
}
