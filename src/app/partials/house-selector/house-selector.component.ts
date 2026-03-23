import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-house-selector',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './house-selector.component.html',
  styleUrl: './house-selector.component.css'
})
export class HouseSelectorComponent {

}
