import { NgModule } from "@angular/core";
import { InicioSesionComponent } from "./inicio-sesion/inicio-sesion.component";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../material.module";


@NgModule({
  declarations: [
    InicioSesionComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
