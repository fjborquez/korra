import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LarderService } from '../../larder.service';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule],
  templateUrl: './app-sidebar.html',
  styleUrl: './app-sidebar.css',
})
export class AppSidebar {
  larder = inject(LarderService);
}
