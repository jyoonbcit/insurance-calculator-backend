import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [ReactiveFormsModule, TuiInputModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent {
  constructor(private formBuilder: FormBuilder) {}

  clientForm = this.formBuilder.group({
    name: '',
  });

  async onSubmit(): Promise<void> {
    try {
      const name = this.clientForm.value.name as string;

      console.log(name);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    } finally {
      this.clientForm.reset();
    }
  }
}
