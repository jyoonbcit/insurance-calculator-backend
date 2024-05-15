import { Component, Input } from '@angular/core';
import { TuiAppBarModule } from '@taiga-ui/experimental';
import { TuiSvgModule } from '@taiga-ui/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';

@Component({
  selector: 'app-appbar',
  standalone: true,
  imports: [TuiAppBarModule, TuiSvgModule, SidebarComponent, TuiSidebarModule],
  templateUrl: './appbar.component.html',
  styleUrl: './appbar.component.scss',
})
export class AppbarComponent {
  @Input() pageName = '';

  open = false;

  toggle(open: boolean) {
    this.open = open;
  }
}
