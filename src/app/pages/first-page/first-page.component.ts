import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserData } from '../../interfaces/UserData';
import next from 'next';

@Component({
  selector: 'app-first-page',
  standalone: true,
  imports: [SidebarComponent, HttpClientModule],
  templateUrl: './first-page.component.html',
  styleUrl: './first-page.component.scss',
})
export class FirstPageComponent implements OnInit {
  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    await this.getTableData();
  }

  async getTableData() {
    const url =
      'https://api.test.ulaznice.hr/paganini/api/job-interview/employees';
    const data = this.http.get<UserData>(url).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error) => {},
    });
  }
}
