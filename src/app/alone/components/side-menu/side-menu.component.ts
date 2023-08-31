import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  name: string,
  route: string
}

@Component({
  standalone: true,
  selector: 'side-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  public menuItems: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'Full-Screen'},
    { route: '/maps/zoom-range', name: 'Zoom-Range'},
    { route: '/maps/markers-page', name: 'Markers'},
    { route: '/maps/properties-page', name: 'Houses'},
    { route: '/alone', name: 'Alone Page'},
  ]

}
