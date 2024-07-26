import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-second-page',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './second-page.component.html',
  styleUrl: './second-page.component.scss'
})
export class SecondPageComponent {

}
