import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TuiDialogService } from '@taiga-ui/core';
import { SupabaseService } from 'app/core/services/supabase.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseService
  ) {}

  loading = false;
  signInForm = this.formBuilder.group({
    email: '',
  });

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const { error } = await this.supabaseService.signIn(email);
      if (error) {
        throw error;
      }
      this.open('Check your email for the login link!');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        this.open(error.message);
      }
    } finally {
      this.signInForm.reset();
      this.loading = false;
    }
  }

  open(message: string) {
    this.dialogs.open(message).subscribe();
  }
}
