import { Component } from '@angular/core';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiLinkModule } from '@taiga-ui/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [TuiSidebarModule, TuiActiveZoneModule, TuiLinkModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  open = false;

  toggle(open: boolean) {
    this.open = open;
  }
}
