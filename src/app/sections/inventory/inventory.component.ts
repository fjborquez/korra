import { Component } from '@angular/core';
import { ProductComponent } from '../../partials/product/product.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FoodWasteDisplayComponent } from "../../partials/food-waste-display/food-waste-display.component";
import { SearchBoxComponent } from "../../partials/search-box/search-box.component";
import { HouseSelectorComponent } from "../../partials/house-selector/house-selector.component";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    ProductComponent,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FoodWasteDisplayComponent,
    SearchBoxComponent,
    HouseSelectorComponent
],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent {

}
