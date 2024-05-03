import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
} from '@taiga-ui/core';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TUI_DIALOG_CLOSES_ON_BACK } from '@taiga-ui/cdk';
import { of } from 'rxjs';
import { SupabaseService } from './core/services/supabase.service';
import { AuthComponent } from './core/components/auth/auth.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    AuthComponent,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    { provide: TUI_DIALOG_CLOSES_ON_BACK, useValue: of(true) },
  ],
})
export class AppComponent implements OnInit {
  constructor(private readonly supabase: SupabaseService) {}

  title = 'DNA';
  session = this.supabase.session;

  ngOnInit() {
    this.supabase.authChanges((_, session) => {
      this.session = session;
    });
  }
}
