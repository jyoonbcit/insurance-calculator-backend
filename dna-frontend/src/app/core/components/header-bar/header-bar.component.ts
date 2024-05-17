import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiLinkModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiAppBarModule } from '@taiga-ui/experimental';
import { HorizontalDividerComponent } from '../horizontal-divider/horizontal-divider.component';

@Component({
  selector: 'app-header-bar',
  standalone: true,
  imports: [
    TuiAppBarModule,
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiLinkModule,
    RouterModule,
    HorizontalDividerComponent,
    TuiSvgModule,
  ],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.scss',
})
export class HeaderBarComponent {
  @Input() pageName = '';
}
