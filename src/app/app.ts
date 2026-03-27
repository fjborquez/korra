import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { AppSidebar } from './partials/app-sidebar/app-sidebar';
import { AppHeader } from './partials/app-header/app-header';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppSidebar, AppHeader],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {}
