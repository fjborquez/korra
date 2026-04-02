import { ChangeDetectionStrategy, Component, inject, output, OnInit, signal, Input, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HouseService } from '../../services/house.service';
import { MatIconModule } from '@angular/material/icon';
import { CityService } from '../../services/city.service';
import { City } from '../../interfaces/city.interface';
import { Response } from '../../interfaces/response.interface';
import { LoginService } from '../../services/login.service';
import { House } from '../../interfaces/house.interface';

@Component({
  selector: 'app-house-form',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './house-form.html',
  styleUrl: './house-form.css',
  styles: [`
    :host { display: block; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseForm implements OnInit {
  private fb = inject(FormBuilder);
  private houseService = inject(HouseService);
  private cityService = inject(CityService);
  private loginService = inject(LoginService);
  cancelled = output<void>();
  saved = output<void>();
  @Input() house!: House | null;
  cities = signal<City[]>([]);
  houseForm = this.fb.group({
    description: ['', [Validators.required]],
    city_id: ['', [Validators.required]],
    is_default: [false],
  });

  ngOnInit() {
    this.cityService.list().subscribe((response: Response) => {
      const cities = response.message as City[];
      this.cities.set(cities);

      this.houseForm.patchValue({
        description: this.house?.description ?? '',
        city_id: this.house?.city?.id.toString() ?? '',
        is_default: this.house?.persons.some((person) => person.user.id === this.loginService.getUserId() && person.pivot?.is_default === 1) ?? false,
      });
    });
  }

  handleCancel() {
    this.cancelled.emit();
  }

  onSubmit() {
    const userId = this.loginService.getUserId();

    if (this.houseForm.valid) {
      const formValue = this.houseForm.value;

      if (this.house) {
        this.houseService.edit(userId, this.house.id, {
          description: formValue.description,
          city_id: formValue.city_id,
          is_default: !!formValue.is_default,
        }).subscribe(() => this.saved.emit());
      } else {
        this.houseService.add(userId, {
          description: formValue.description,
          city_id: formValue.city_id,
          is_default: !!formValue.is_default,
        }).subscribe(() => this.saved.emit());
      }
    }
  }
}
