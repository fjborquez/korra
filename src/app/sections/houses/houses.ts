import { House } from './../../interfaces/house.interface';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HouseService } from '../../services/house.service';
import { LoginService } from '../../services/login.service';
import { Response } from '../../interfaces/response.interface';
import { Person } from '../../interfaces/person.interface';
import { HousesHouseInfo } from "../../partials/house-info/house-info";
import { HouseForm } from "../../partials/house-form/house-form";
import { HouseSelectorService } from '../../services/house-selector.service';


@Component({
  selector: 'app-houses',
  imports: [MatIconModule, HousesHouseInfo, HouseForm],
  templateUrl: './houses.html',
  styleUrl: './houses.css',
})
export class Houses implements OnInit {
  houseService: HouseService = inject(HouseService);
  loginService: LoginService = inject(LoginService);
  houseSelectorService: HouseSelectorService = inject(HouseSelectorService);
  houses = signal<House[]>([]);
  defaultHouse = signal<House | null>(null);
  showAddModal = signal(false);
  isLoading = signal(false);

  constructor() {
    effect(() => {
      if (!this.showAddModal()) {
        this.housesList();
      }
    });
  }

  ngOnInit() {
    this.housesList();
  }

  housesList() {
    const userId = this.loginService.getUserId();
    this.isLoading.set(true);

    this.houseService.list(userId).subscribe((response: Response) => {
      const houses = response.message as House[];
      const defaultHouse = houses.filter((house: House) => house.persons.some((person: Person) => person.user !== null && person.user.id === userId && person.pivot?.is_default));

      if (defaultHouse.length > 0) {
        this.defaultHouse.set(defaultHouse[0]);
      } else if (houses.length > 0) {
        this.defaultHouse.set(houses[0]);
      } else {
        this.defaultHouse.set(null);
      }
      this.houses.set(houses);
      this.isLoading.set(false);
    });
  }

  refreshList() {
    this.housesList();
    this.houseSelectorService.emitRefresh();

  }
}
