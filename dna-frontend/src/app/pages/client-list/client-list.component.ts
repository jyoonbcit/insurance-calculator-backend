import { Component, Inject } from '@angular/core';
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiDialogService,
  TuiRootModule,
} from '@taiga-ui/core';
import { ActionItemComponent } from 'app/core/components/action-item/action-item.component';
import { NgFor } from '@angular/common';
import { HorizontalDividerComponent } from 'app/core/components/horizontal-divider/horizontal-divider.component';
import { TUI_PROMPT } from '@taiga-ui/kit';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    TuiButtonModule,
    ActionItemComponent,
    HorizontalDividerComponent,
    NgFor,
    TuiDialogModule,
    TuiRootModule,
    RouterLink,
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

  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService
  ) {}

  openDeleteDialog(clientName: string) {
    this.dialogs
      .open<boolean>(TUI_PROMPT, {
        data: {
          content: `Do you want to delete ${clientName}? This action cannot be undone.`,
          yes: 'Delete',
          no: 'Cancel',
        },
      })
      .subscribe();
  }
}
