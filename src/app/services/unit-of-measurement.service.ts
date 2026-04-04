import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Response } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class UnitOfMeasurementService {
  private http: HttpClient = inject(HttpClient);

  list() {
    return this.http.get<Response>(environment.backendUrl + `unit-of-measurement`);
  }
}
