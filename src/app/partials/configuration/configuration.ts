import { ChangeDetectionStrategy, Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ConfigurationService } from '../../services/configuration.service';
import { LoginService } from '../../services/login.service';
import { dateToChileanFormat } from '../../functions/date-to-chilean-format.function';
import { Response } from '../../interfaces/response.interface';

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
export class Configuration implements OnInit {
  private fb = inject(FormBuilder);
  private configurationService = inject(ConfigurationService);
  private loginService = inject(LoginService);

  cancelled = output<void>();
  saved = output<void>();
  configForm = this.fb.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    date_of_birth: [new Date(), [Validators.required]],
    password: ['']
  });

  ngOnInit(): void {
    this.configurationService.get(this.loginService.getUserId())
      .subscribe((response: Response) => {
        const configurationValues = response.message;
        this.configForm.patchValue({
          name: configurationValues.name,
          lastname: configurationValues.lastname,
          date_of_birth: configurationValues.date_of_birth
        });
      });
  }

  handleCancel() {
    this.cancelled.emit();
  }

  onSubmit() {
    if (this.configForm.valid) {
      const formValues = this.configForm.value;
      const values = {
        name: formValues.name,
        lastname: formValues.lastname,
        password: formValues.password,
      } as {
        name: string;
        lastname: string;
        password: string;
        date_of_birth?: string;
      };

      if (formValues.date_of_birth) {
        values.date_of_birth = dateToChileanFormat(String(formValues.date_of_birth));
      }

      this.configurationService.edit(this.loginService.getUserId(), values)
        .subscribe(() => this.saved.emit());
    }
  }
}
