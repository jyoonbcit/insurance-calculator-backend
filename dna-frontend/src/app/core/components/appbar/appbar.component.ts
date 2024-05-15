import { Component, Input } from '@angular/core';
import { TuiAppBarModule } from '@taiga-ui/experimental';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-appbar',
  standalone: true,
  imports: [TuiAppBarModule, SidebarComponent],
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
