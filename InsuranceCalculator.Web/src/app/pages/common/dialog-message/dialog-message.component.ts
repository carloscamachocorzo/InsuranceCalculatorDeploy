import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDto } from '../../../core/models/dialog-dto';

@Component({
  selector: 'app-dialog-message',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-message.component.html',
  styleUrl: './dialog-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogMessageComponent {
  data: DialogDto = inject(MAT_DIALOG_DATA);
}
