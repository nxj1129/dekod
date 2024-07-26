import { Routes } from '@angular/router';
import { FirstPageComponent } from './pages/first-page/first-page.component';
import { SecondPageComponent } from './pages/second-page/second-page.component';

export const routes: Routes = [
  { path: '', component: FirstPageComponent },
  { path: 'second', component: SecondPageComponent },
];
