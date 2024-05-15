import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiLinkModule } from '@taiga-ui/core';
import { HorizontalDividerComponent } from '../horizontal-divider/horizontal-divider.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiLinkModule,
    RouterModule,
    HorizontalDividerComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}
