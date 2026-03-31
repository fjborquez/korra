import { Component, Input } from '@angular/core';
import { House } from '../../interfaces/house.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-house-info',
  imports: [MatIconModule],
  templateUrl: './house-info.html',
  styleUrl: './house-info.css',
})
export class HousesHouseInfo {
  @Input() defaultHouse!: House | null;
  @Input() house!: House;
}
