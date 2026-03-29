import { LoginService } from './../../services/login.service';
import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HouseService } from '../../services/house.service';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  houses: any = signal([]);
  isPropertyDropdownOpen = signal(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedHouse: any = signal(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  showHousesSelector: any = signal(false);

  ngOnInit() {
    const userId = this.loginService.getUserId();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.houseService.list(userId).subscribe((houses: any) => {
      this.houses.set(houses.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.selectedHouse.set(houses.message.find((house: any) => house.is_active === 1 && house.persons.filter((person: any) => person.user.id === userId && person.pivot.is_default === 1)));
      this.currentHouseId.emit(this.selectedHouse().id);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Update the condition based on the current URL
      this.showHousesSelector = event.url !== '/inventory';
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectHouse(house: any) {
    this.selectedHouse.set(house);
    this.currentHouseId.emit(house.id);
  }
}
