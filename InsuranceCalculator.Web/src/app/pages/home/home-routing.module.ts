import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SimulatorComponent } from './simulator/simulator.component';
import { SimulatorHistoryComponent } from './simulator-history/simulator-history.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', component: DashboardComponent, pathMatch: 'full', data: { title: 'Inicio' } },
      { path: 'dashboard', component: DashboardComponent , data: { title: 'Inicio' }},
      { path: 'simulator', component: SimulatorComponent, data: { title: 'Simulador' } },
      { path: 'simulator-history', component: SimulatorHistoryComponent, data: { title: 'Historial' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
