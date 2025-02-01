import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { throwError } from 'rxjs';
import { ExceptionDto } from '../models/exception-dto';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private _http: HttpClient) {}

  Post(endpoint: string, typeEndPoint: string, value: any): Promise<object> {
    let response = this._http
      .post(`${environment.backend}${endpoint}/${typeEndPoint}`, value)
      .toPromise()
      .then((result) => result as object)
      .catch(this.handleError);
    return response;
  }

  DownloadFile(endpoint: string, typeEndPoint: string, value: any): Promise<object> {
    let response = this._http
      .post(`${environment.backend}${endpoint}/${typeEndPoint}`, value,{responseType: 'blob', observe: 'response'})
      .toPromise()
      .then((result) => result as HttpResponse<Blob>)
      .catch(this.handleError);
    return response;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Ocurre un error al lado del cliente o error de red
      console.error('Ocurrio un error:', error.error.message);
      return Promise.reject({
        Message: 'Ups ocurrió un error',
      } as ExceptionDto);
    } else {
      // El Api retorna respuesta no satisfactoria.
      // El cuerpo de la respueta puede contener algo que indique el error.
      return Promise.reject({
        Message: error.error?.message,
      } as ExceptionDto);
    }
  }
}
