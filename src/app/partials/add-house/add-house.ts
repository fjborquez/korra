import { ChangeDetectionStrategy, Component, inject, output, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HouseService } from '../../services/house.service';
import { MatIconModule } from '@angular/material/icon';
import { CityService } from '../../services/city.service';
import { City } from '../../interfaces/city.interface';
import { Response } from '../../interfaces/response.interface';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-add-house',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './add-house.html',
  styleUrl: './add-house.css',
  styles: [`
    :host { display: block; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddHouse implements OnInit {
  private fb = inject(FormBuilder);
  private houseService = inject(HouseService);
  private cityService = inject(CityService);
  private loginService = inject(LoginService);
  cancelled = output<void>();
  saved = output<void>();
  cities = signal<City[]>([]);

  ngOnInit() {
    this.cityService.list().subscribe((response: Response) => {
      const cities = response.message as City[];
      this.cities.set(cities);
    });
  }

  houseForm = this.fb.group({
    description: [''],
    city_id: ['Santiago', [Validators.required]],
    is_default: [false],
  });

  handleCancel() {
    this.cancelled.emit();
  }

  onSubmit() {
    const userId = this.loginService.getUserId();

    if (this.houseForm.valid) {
      const formValue = this.houseForm.value;
      this.houseService.add(userId, {
        description: formValue.description,
        city_id: formValue.city_id,
        is_default: !!formValue.is_default,
      }).subscribe(() => this.saved.emit());
    }
  }
}
