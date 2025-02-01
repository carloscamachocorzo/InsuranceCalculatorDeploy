import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  summaryCards = [
    { title: 'Users', value: '98.5%' },
    { title: 'Views', value: '31,124' },
    { title: 'Revenue', value: '$2,125' },
  ];

}
