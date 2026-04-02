import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { House } from '../../interfaces/house.interface';
import { MatIconModule } from '@angular/material/icon';
import { HouseService } from '../../services/house.service';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HouseForm } from '../house-form/house-form';

@Component({
  selector: 'app-house-info',
  imports: [MatIconModule, HouseForm],
  templateUrl: './house-info.html',
  styleUrl: './house-info.css',
})
export class HousesHouseInfo {
  @Input() defaultHouse!: House | null;
  @Input() house!: House;
  @Output() refreshList = new EventEmitter<void>();
  houseService: HouseService = inject(HouseService);
  loginService: LoginService = inject(LoginService);
  matSnackBar: MatSnackBar = inject(MatSnackBar);
  showHouseForm = signal(false);

  modalState = signal<{
    isOpen: boolean;
    item: House | null;
  }>({
    isOpen: false,
    item: null
  });

  confirmAction() {
    const state = this.modalState();
    const userId = this.loginService.getUserId();
    const house: House | null = state.item;

    if (!house) {
      this.closeModal();
      return;
    }

    this.houseService.delete(userId, house.id).subscribe({
      error: () => {
        this.matSnackBar.open('No se pudo eliminar la casa', 'Cerrar', {
          duration: 3000,
          panelClass: ['custom-mat-snackbar']
        });
        this.refreshList.emit();
        this.closeModal();
      },
      next: () => {
        this.matSnackBar.open('La casa fue eliminada', 'Cerrar', {
          duration: 3000,
          panelClass: ['custom-mat-snackbar']
        });
        this.refreshList.emit();
        this.closeModal();
      },
    });
  }

  openModal(item: House) {
    this.modalState.set({ isOpen: true, item });
  }

  closeModal() {
    this.modalState.set({ isOpen: false, item: null });
  }

  saved() {
    this.showHouseForm.set(false)
    this.refreshList.emit();
  }
}
