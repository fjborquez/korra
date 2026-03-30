import { LoginService } from './../../services/login.service';
import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HouseService } from '../../services/house.service';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { House } from '../../interfaces/house.interface';
import { Response } from '../../interfaces/response.interface';
import { Person } from '../../interfaces/person.interface';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, CommonModule],
  templateUrl: './app-sidebar.html',
  styleUrl: './app-sidebar.css',
})
export class AppSidebar implements OnInit {
  houseService: HouseService = inject(HouseService);
  loginService: LoginService = inject(LoginService);
  router: Router = inject(Router);

  @Output() currentHouseId = new EventEmitter<number>();
  houses = signal<House[]>([]);
  isPropertyDropdownOpen = signal(false);
  selectedHouse = signal<House | null>(null);
  showHousesSelector = signal(false);

  ngOnInit() {
    const userId = this.loginService.getUserId();
    this.houseService.list(userId).subscribe((response: Response) => {
      const houses: House[] = response.message;
      this.houses.set(houses);
      this.selectedHouse.set(houses.find((house: House) => house.is_active === 1 && house.persons.filter((person: Person) => person.user?.id === userId && person.pivot?.is_default === 1)) ?? null);
      this.currentHouseId.emit(this.selectedHouse()?.id);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showHousesSelector.set(event.url !== '/inventory');
    });
  }

  togglePropertyDropdown() {
    this.isPropertyDropdownOpen.update(v => !v);
  }

  handlePropertyKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.togglePropertyDropdown();
    }
  }

  selectHouse(house: House) {
    this.selectedHouse.set(house);
    this.currentHouseId.emit(house.id);
  }
}
