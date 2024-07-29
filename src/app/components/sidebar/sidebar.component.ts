import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(private router: Router) {

  }

  async navigate(route: string) {
    await this.router.navigateByUrl(route);
  }

  isActive(route: string): boolean {
    return this.router.url === '/' + route;
  }

}
