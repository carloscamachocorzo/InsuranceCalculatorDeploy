import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressSpinnerService } from '../../../core/services/progress-spinner.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule,AsyncPipe,CommonModule],
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.css',
})
export class ProgressSpinnerComponent {
  isLoading$;

  constructor(private progressSpinnerService: ProgressSpinnerService) {

    this.isLoading$ = this.progressSpinnerService.isLoading$;
  }



}
