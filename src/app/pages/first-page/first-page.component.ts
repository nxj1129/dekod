import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserData } from '../../interfaces/UserData';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-first-page',
  standalone: true,
  imports: [SidebarComponent, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './first-page.component.html',
  styleUrl: './first-page.component.scss',
})
export class FirstPageComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  displayedUsers: any[] = [];
  nameFilter: string = '';
  jobTitleFilter: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    await this.getTableData();
  }

  async getTableData() {
    const url =
      'https://api.test.ulaznice.hr/paganini/api/job-interview/employees';
    this.http.get<UserData>(url).subscribe({
      next: (result) => {
        this.users = result.data;
        this.displayInitialData();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }

  displayInitialData() {
    this.filterByFirstAndLastName();
    this.filterByJobTitle();
    this.updatePagination();
  }

  filterByFirstAndLastName() {
    this.currentPage = 1;
    this.filteredUsers = this.users.filter((user) =>
      (
        user.firstName.toLowerCase() +
        ' ' +
        user.lastName.toLowerCase()
      ).includes(this.nameFilter.toLowerCase())
    );
    this.updatePagination();
  }

  filterByJobTitle() {
    this.currentPage = 1;
    this.filteredUsers = this.users.filter((user) =>
      user.jobTitle.toLowerCase().includes(this.jobTitleFilter.toLowerCase())
    );
    this.updatePagination();
  }

  sortData(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredUsers.sort((a, b) => {
      let valueA: any;
      let valueB: any;

      switch (column) {
        case 'firstName':
          valueA = a.firstName.toLowerCase();
          valueB = b.firstName.toLowerCase();
          break;
        case 'lastName':
          valueA = a.lastName.toLowerCase();
          valueB = b.lastName.toLowerCase();
          break;
        case 'jobTitle':
          valueA = a.jobTitle.toLowerCase();
          valueB = b.jobTitle.toLowerCase();
          break;
        default:
          return 0;
      }

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
    this.currentPage = Math.max(1, this.currentPage);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedUsers = this.filteredUsers.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
