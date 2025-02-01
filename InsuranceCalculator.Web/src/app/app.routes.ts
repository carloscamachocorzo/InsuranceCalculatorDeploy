import { Routes } from '@angular/router';
import { SimulatorComponent } from './pages/home/simulator/simulator.component';
import { SimulatorHistoryComponent } from './pages/home/simulator-history/simulator-history.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)}
];
