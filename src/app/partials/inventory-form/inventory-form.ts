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
import { UnitOfMeasurement } from '../../interfaces/unit-of-measurement.interface';

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
  @Input() houseId!: number;
  cancelled = output<void>();
  inventoryForm = this.fb.group({
    product: ['', [Validators.required]],
    quantity: [0, [Validators.required, Validators.min(0)]],
    unit_of_measurement: ['', [Validators.required]],
    purchase_date: [new Date()],
    expiration_date: [new Date()],
  });
  productsCatalog!: Observable<ProductCatalog[]>;
  unitsOfMeasurement = signal<UnitOfMeasurement[]>([])

  ngOnInit() {
    this.productCatalogService.list().subscribe((response: Response) => {
      const products = response.message.flat() as ProductCatalog[];
      this.productsCatalog = this.inventoryForm.get('product')!.valueChanges.pipe(
        startWith(''),
        map((value: string | null) => products.filter((product: ProductCatalog) => existsForAutocomplete(product.type.description, value || '')
          || existsForAutocomplete(product.presentation?.description, value || '') || existsForAutocomplete(product.brand?.name, value || ''))),
      )
    });

    this.unitOfMeasurementService.list().subscribe((response: Response) => {
      const units = response.message as UnitOfMeasurement[];
      this.unitsOfMeasurement.set(units);
    });
  }

  handleCancel() {
    this.cancelled.emit();
  }

  onSubmit() {
    const userId = this.loginService.getUserId();
  }

  displayProductCatalog(productCatalog: ProductCatalog): string {
    let productName = productCatalog.type ? productCatalog.type.description : '';
    productName += productCatalog.presentation ? ' ' + productCatalog.presentation.description : '';
    productName += productCatalog.brand ? ' ' + productCatalog.brand.name : '';
    return productName;
  }
}

