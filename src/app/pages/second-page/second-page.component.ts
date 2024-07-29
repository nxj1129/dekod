import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-second-page',
  standalone: true,
  imports: [SidebarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './second-page.component.html',
  styleUrl: './second-page.component.scss',
})
export class SecondPageComponent {
  usersForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.usersForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
  }

  displayInConsole() {
    if (this.usersForm.valid) {
      console.log(this.usersForm.getRawValue());
    }
  }
}
