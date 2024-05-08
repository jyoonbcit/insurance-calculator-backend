import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, Routes } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiBreadcrumbsModule } from '@taiga-ui/kit';
import { routes } from 'app/app.routes';

@Component({
  selector: 'app-bottom-bar',
  standalone: true,
  imports: [
    TuiBreadcrumbsModule,
    TuiButtonModule,
    RouterLink,
    RouterLinkActive,
    NgFor,
  ],
  templateUrl: './bottom-bar.component.html',
  styleUrl: './bottom-bar.component.scss',
})
export class BottomBarComponent {
  // This can be modified to pass in specific routes instead of all existing routes
  @Input() routes: Routes = [...routes];

  back() {}

  next() {}
}
