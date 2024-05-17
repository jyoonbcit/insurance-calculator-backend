import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputNumberModule } from '@taiga-ui/kit';
import { HorizontalDividerComponent } from 'app/core/components/horizontal-divider/horizontal-divider.component';
import { HeaderBarComponent } from 'app/core/components/header-bar/header-bar.component';
import { ActionBarComponent } from 'app/core/components/action-bar/action-bar.component';
import { BottomBarComponent } from 'app/core/components/bottom-bar/bottom-bar.component';

@Component({
  selector: 'app-debt-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiButtonModule,
    HorizontalDividerComponent,
    NgIf,
    HeaderBarComponent,
    ActionBarComponent,
    BottomBarComponent,
  ],
  templateUrl: './debt-edit.component.html',
  styleUrl: './debt-edit.component.scss',
})
export class DebtEditComponent {}
