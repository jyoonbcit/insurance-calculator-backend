import { Component } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { ActionItemComponent } from 'app/core/components/action-item/action-item.component';
import { NgFor } from '@angular/common';
import { HorizontalDividerComponent } from 'app/core/components/horizontal-divider/horizontal-divider.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    TuiButtonModule,
    ActionItemComponent,
    HorizontalDividerComponent,
    NgFor,
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
})
export class ClientListComponent {
  clientNames = [
    'First Client',
    'Second Client',
    'Third Client',
    'Fourth Client',
    'Fifth Client',
  ];
}
