import { Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';

export const routes: Routes = [
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: '',   redirectTo: '/inicio-sesion', pathMatch: 'full' },

];
