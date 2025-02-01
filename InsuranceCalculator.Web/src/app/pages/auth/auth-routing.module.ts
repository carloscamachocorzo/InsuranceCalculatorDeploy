import { RouterModule, Routes } from "@angular/router";
import { InicioSesionComponent } from "./inicio-sesion/inicio-sesion.component";
import { NgModule } from "@angular/core";


const routes: Routes = [
  { path: 'login', component: InicioSesionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
