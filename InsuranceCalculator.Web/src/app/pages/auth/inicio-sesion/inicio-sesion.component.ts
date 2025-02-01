import {
  ChangeDetectionStrategy,
  Component,
  signal,
  inject,
} from '@angular/core';
import { MaterialModule } from '../../../material.module';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../../common/dialog-message/dialog-message.component';
import { Router } from '@angular/router';
import { DialogDto } from '../../../core/models/dialog-dto';
import { HttpClientService } from '../../../core/services/http-client.service';
import { UserCredentialsDto } from '../../../core/models/request/user-credentials-dto';
import { EndPoints } from '../../../core/models/const/endpoints.enum';
import { TypeEndPoints } from '../../../core/models/const/type-endpoints.enum';
import { ExceptionDto } from '../../../core/models/exception-dto';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  standalone: false,
  styleUrl: './inicio-sesion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioSesionComponent {
  readonly dialog = inject(MatDialog);
  hide = signal(true);
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private service: HttpClientService) {}

  async submit() {
    let dialog = { Tittle: 'Mensaje', Message: '' } as DialogDto;
    if (this.form.valid) {
      try {
        let loginUser = {
          username: this.form.value.username,
          password: this.form.value.password,
        } as UserCredentialsDto;

        let response = (await this.service.Post(
          EndPoints.Auth,
          TypeEndPoints.LoginJwt,
          loginUser
        )) as any;

        console.log(response);
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/home']);
      } catch (error: any) {
        dialog.Message = error.Message;
        this.dialog.open(DialogMessageComponent, {
          data: dialog,
        });
      }
    } else {
      dialog.Message = 'Diligencie los campos requeridos';
      this.dialog.open(DialogMessageComponent, {
        data: dialog,
      });
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };
}
