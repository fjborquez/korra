import { House } from './../../interfaces/house.interface';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HouseService } from '../../services/house.service';
import { LoginService } from '../../services/login.service';
import { Response } from '../../interfaces/response.interface';
import { Person } from '../../interfaces/person.interface';
import { HousesHouseInfo } from "../../partials/house-info/house-info";
import { HouseForm } from "../../partials/house-form/house-form";


@Component({
  selector: 'app-houses',
  imports: [MatIconModule, HousesHouseInfo, HouseForm],
  templateUrl: './houses.html',
  styleUrl: './houses.css',
})
export class Houses implements OnInit {
  houseService: HouseService = inject(HouseService);
  loginService: LoginService = inject(LoginService);
  houses = signal<House[]>([]);
  defaultHouse = signal<House | null>(null);
  showAddModal = signal(false);

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

    this.houseService.list(userId).subscribe((response: Response) => {
      const houses = response.message as House[];
      this.houses.set(houses);
      this.defaultHouse.set(houses.find((house: House) => house.persons.some((person: Person) => person.user.id === userId && person.pivot?.is_default === 1)) ?? null);
    });
  }

  refreshList() {
    this.housesList();
  }
}
