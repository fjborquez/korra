import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { AppSidebar } from './partials/app-sidebar/app-sidebar';
import { AppHeader } from './partials/app-header/app-header';
import { LoginService } from './services/login.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppSidebar, AppHeader],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  loginService: LoginService = inject(LoginService);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  houseId: any = signal(null);

  getCurrentHouseId(houseId: number) {
    this.houseId.set(houseId);
  }
}
