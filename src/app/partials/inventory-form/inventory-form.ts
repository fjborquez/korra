import { InventoryService } from './../../services/inventory.service';
import { UnitOfMeasurement } from './../../interfaces/unit-of-measurement.interface';
import { InventoryProduct } from './../../interfaces/inventory-product.interface';
import { Component, inject, Input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../services/login.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ProductCatalog } from '../../interfaces/product-catalog.interface';
import { ProductCatalogService } from '../../services/product-catalog.service';
import { Response } from '../../interfaces/response.interface';
import { map, Observable, startWith } from 'rxjs';
import { existsForAutocomplete } from '../../functions/exists-for-autocomplete.function';
import { AsyncPipe } from '@angular/common';
import { UnitOfMeasurementService } from '../../services/unit-of-measurement.service';
import { House } from '../../interfaces/house.interface';
import { HouseService } from '../../services/house.service';

@Component({
  selector: 'app-inventory-form',
  imports: [MatIconModule, ReactiveFormsModule, MatAutocompleteModule, AsyncPipe],
  templateUrl: './inventory-form.html',
  styleUrl: './inventory-form.css',
})
export class InventoryForm implements OnInit {
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private productCatalogService = inject(ProductCatalogService);
  private unitOfMeasurementService = inject(UnitOfMeasurementService);
  private inventoryService = inject(InventoryService);
  private houseService = inject(HouseService);
  @Input() houseId!: number;
  @Input() inventoryProduct?: InventoryProduct | null;
  cancelled = output<void>();
  inventoryForm = this.fb.group({
    product: [null as ProductCatalog | string | null, [Validators.required]],
    quantity: [0, [Validators.required, Validators.min(0)]],
    unit_of_measurement: [null as UnitOfMeasurement | string | null, [Validators.required]],
    purchase_date: [new Date().toISOString().split('T')[0], [Validators.required]],
    expiration_date: [''],
  });
  productsCatalog!: Observable<ProductCatalog[]>;
  unitsOfMeasurement = signal<UnitOfMeasurement[]>([])
  saved = output<void>();

  ngOnInit() {
    this.productCatalogService.list().subscribe((response: Response) => {
      const products = response.message.flat() as ProductCatalog[];
      this.productsCatalog = this.inventoryForm.get('product')!.valueChanges.pipe(
        startWith('' as string | ProductCatalog | null),
        map((value: string | ProductCatalog | null) => {
          const filterValue = typeof value === 'string' ? value : value ? this.displayProductCatalog(value) : '';

          if (this.inventoryProduct && filterValue === '') {
            const currentProduct = products.find(product => product.id === this.inventoryProduct!.catalog_id);
            if (currentProduct) {
              this.inventoryForm.patchValue({
                product: currentProduct
              });
            }
          }

          return products.filter((product: ProductCatalog) => existsForAutocomplete(product.type.description, filterValue)
            || existsForAutocomplete(product.presentation?.description, filterValue) || existsForAutocomplete(product.brand?.name, filterValue));
        }),
      )
    });

    this.unitOfMeasurementService.list().subscribe((response: Response) => {
      const units = response.message as UnitOfMeasurement[];
      this.unitsOfMeasurement.set(units);

      if (this.inventoryProduct) {
        const unitOfMeasurement = units.find(unit => unit.id === this.inventoryProduct!.uom_id);
        if (unitOfMeasurement) {
          this.inventoryForm.patchValue({
            unit_of_measurement: unitOfMeasurement
          });
        }
      }
    });

    if (this.inventoryProduct) {
      this.inventoryForm.patchValue({
        quantity: this.inventoryProduct.quantity,
        purchase_date: this.inventoryProduct.purchase_date.toISOString().split('T')[0],
        expiration_date: this.inventoryProduct.expiration_date.toISOString().split('T')[0] ?? null,
      });
    }
  }

  handleCancel() {
    this.cancelled.emit();
  }

  onSubmit() {
    const userId = this.loginService.getUserId();

    this.houseService.get(userId, this.houseId).subscribe((response: Response) => {
      const house = response.message as House;

      if (this.inventoryForm.valid) {
        const formValue = this.inventoryForm.value;
        const product = formValue.product as ProductCatalog;
        const unitOfMeasurement = formValue.unit_of_measurement as UnitOfMeasurement;

        if (this.inventoryProduct) {
          this.inventoryService.edit(userId, this.houseId, this.inventoryProduct.id, {
            house_id: this.houseId,
            house_description: house.description,
            quantity: formValue.quantity,
            uom_id: unitOfMeasurement.id,
            uom_description: unitOfMeasurement.description,
            uom_abbreviation: unitOfMeasurement.abbreviation,
            purchase_date: formValue.purchase_date,
            expiration_date: formValue.expiration_date ? formValue.expiration_date : null,
            catalog_id: product.id,
            catalog_description: this.saveProductCatalogText(product),
            brand_id: product.brand?.id,
            brand_name: product.brand?.name,
            category_id: product.category?.id,
            category_name: product.category?.name
          }).subscribe(() => {
            this.saved.emit();
          });
        } else {
          this.inventoryService.add(userId, this.houseId, {
            house_id: this.houseId,
            house_description: house.description,
            quantity: formValue.quantity,
            uom_id: unitOfMeasurement.id,
            uom_description: unitOfMeasurement.description,
            uom_abbreviation: unitOfMeasurement.abbreviation,
            purchase_date: formValue.purchase_date,
            expiration_date: formValue.expiration_date ? formValue.expiration_date : null,
            catalog_id: product.id,
            catalog_description: this.saveProductCatalogText(product),
            brand_id: product.brand?.id,
            brand_name: product.brand?.name,
            category_id: product.category?.id,
            category_name: product.category?.name
          }).subscribe(() => {
            this.saved.emit();
          });
        }
      }
    });
  }

  displayProductCatalog(productCatalog: ProductCatalog): string {
    if (productCatalog === null) {
      return '';
    }

    let productName = productCatalog.type ? productCatalog.type.description : '';
    productName += productCatalog.presentation ? ' ' + productCatalog.presentation.description : '';
    productName += productCatalog.brand ? ' ' + productCatalog.brand.name : '';
    return productName;
  }

   saveProductCatalogText(productCatalog: ProductCatalog): string {
    let productCatalogText = '';

    if (Object.keys(productCatalog).length === 0) {
      return productCatalogText;
    }

    if (productCatalog.type.description) {
      productCatalogText += productCatalog.type.description;
      productCatalogText += ' ';
    }

    if (productCatalog.presentation?.description) {
      productCatalogText += productCatalog.presentation.description;
      productCatalogText += ' ';
    }

    productCatalogText = productCatalogText.trim();

    return productCatalogText;
  }
}

