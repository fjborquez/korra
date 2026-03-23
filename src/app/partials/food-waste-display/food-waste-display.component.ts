import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar'

@Component({
  selector: 'app-food-waste-display',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './food-waste-display.component.html',
  styleUrl: './food-waste-display.component.css'
})
export class FoodWasteDisplayComponent {

}
