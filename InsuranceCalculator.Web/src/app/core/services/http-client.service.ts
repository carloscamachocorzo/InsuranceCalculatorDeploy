import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { throwError } from 'rxjs';
import { ExceptionDto } from '../models/exception-dto';
import { ProgressSpinnerService } from './progress-spinner.service';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(
    private _http: HttpClient,
    private progressSpinnerService: ProgressSpinnerService
  ) {}

  Post(endpoint: string, typeEndPoint: string, value: any): Promise<object> {
    this.progressSpinnerService.show();
    return this._http
      .post(`${environment.backend}${endpoint}/${typeEndPoint}`, value)
      .toPromise()
      .then((result) => {
        this.progressSpinnerService.hide();
        return result as object;
      })
      .catch(this.handleError); // Aquí se pasa la función de flecha
  }

  DownloadFile(endpoint: string, typeEndPoint: string, value: any): Promise<object> {
    this.progressSpinnerService.show();
    return this._http
      .post(`${environment.backend}${endpoint}/${typeEndPoint}`, value, {
        responseType: 'blob',
        observe: 'response',
      })
      .toPromise()
      .then((result) => {
        this.progressSpinnerService.hide();
        return result as HttpResponse<Blob>;
      })
      .catch(this.handleError); // Aquí se pasa la función de flecha
  }

  private handleError = (error: HttpErrorResponse) => {
    this.progressSpinnerService.hide(); // Ahora "this" se refiere correctamente al servicio
    if (error.error instanceof ErrorEvent) {
      // Ocurre un error al lado del cliente o error de red
      console.error('Ocurrió un error:', error.error.message);
      return Promise.reject({
        Message: 'Ups, ocurrió un error',
      } as ExceptionDto);
    } else {
      // El API retorna una respuesta no satisfactoria
      console.error('Error del servidor:', error.error?.message);
      return Promise.reject({
        Message: error.error?.message,
      } as ExceptionDto);
    }
  };
}
