import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-configuration',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './configuration.html',
  styleUrl: './configuration.css',
  styles: [`
    :host { display: block; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Configuration {
  private fb = inject(FormBuilder);
  cancelled = output<void>();
  saved = output<void>();
  configForm = this.fb.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    date_of_birth: [new Date(), [Validators.required]],
    password: ['', [Validators.required]]
  });

  handleCancel() {
    this.cancelled.emit();
  }

  onSubmit() {
    if (this.configForm.valid) {
      console.log(this.configForm.value);
    }
  }
}
