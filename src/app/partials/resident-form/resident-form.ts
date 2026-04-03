import { ResidentService } from '../../services/resident.service';
import { ChangeDetectionStrategy, Component, inject, Input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Person } from '../../interfaces/person.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { dateToChileanFormat } from '../../functions/date-to-chilean-format.function';

@Component({
  selector: 'app-resident-form',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './resident-form.html',
  styleUrl: './resident-form.css',
  styles: [`
    :host { display: block; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResidentForm {
  private fb = inject(FormBuilder);
  private loginService: LoginService = inject(LoginService);
  private residentService: ResidentService = inject(ResidentService);

  cancelled = output<void>();
  saved = output<void>();
  residentForm = this.fb.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    date_of_birth: ['', [Validators.required]],
  });
  @Input() houseId!: number;
  @Input() person: Person | null = null;

  handleCancel() {
    this.cancelled.emit();
  }

  onSubmit() {
    const userId = this.loginService.getUserId();

    if (this.residentForm.valid) {
      const formValue = this.residentForm.value;
      const residentData = {
        name: formValue.name,
        lastname: formValue.lastname,
        date_of_birth: dateToChileanFormat(formValue.date_of_birth ?? '')
      };

      if (this.person) {
        this.residentService.edit(userId, this.person?.id, this.houseId, residentData).subscribe(() => {
          this.saved.emit()
        });
      } else {
        this.residentService.add(userId, this.houseId, residentData).subscribe(() => {
          this.saved.emit();
        });
      }
    }
  }

}
