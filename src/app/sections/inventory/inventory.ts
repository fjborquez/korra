import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LarderService } from '../../larder.service';
import { CommonModule } from '@angular/common';
import { InventoryFilters } from "../../partials/inventory-filters/inventory-filters";
import { InventoryProduct } from "../../partials/inventory-product/inventory-product";
import { Inventory as InventoryService } from '../../services/inventory';
import { SmartInsight } from "../../partials/smart-insight/smart-insight";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, InventoryProduct, InventoryFilters, SmartInsight],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Inventory implements OnInit {
  larder = inject(LarderService);
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

  ngOnInit() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.inventoryService.list(1, 1).subscribe((response: any) => {
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

  filterByStatus(aStatus: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (aStatus === 'all') {
      this.productsToShow.set(this.products());
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.productsToShow.set(this.products().filter((product: any) => product.product_status.find((status: any) => status.pivot.is_active === 1).description  === aStatus));
    }
  }
}
