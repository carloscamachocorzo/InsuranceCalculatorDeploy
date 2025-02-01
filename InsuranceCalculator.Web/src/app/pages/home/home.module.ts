import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../../material.module';
import { SimulatorComponent } from './simulator/simulator.component';
import { SimulatorHistoryComponent } from './simulator-history/simulator-history.component';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewSimulatorComponent } from '../common/view-simulator/view-simulator.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SimulatorComponent,
    SimulatorHistoryComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DecimalPipe,
    ViewSimulatorComponent
  ],
  providers:[DecimalPipe]
})
export class HomeModule { }
