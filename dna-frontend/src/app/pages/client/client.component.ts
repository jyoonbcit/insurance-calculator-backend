import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiDataListModule } from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { AppbarComponent } from 'app/core/components/appbar/appbar.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputDateModule,
    TuiInputNumberModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    AppbarComponent,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl(),
      birthDate: new FormControl(),
      expectedRetirementAge: new FormControl(),
      province: new FormControl(),
      annualIncome: new FormControl(),
      incomeReplacementMultiplier: new FormControl(),
      taxBracket: new FormControl(),
    });
  }
}
