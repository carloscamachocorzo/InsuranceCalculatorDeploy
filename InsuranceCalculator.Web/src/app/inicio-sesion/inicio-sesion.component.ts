import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {

  error: boolean = false;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.error = true;
      console.log("holi");
    }
  }

}
