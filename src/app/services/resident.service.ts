import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResidentService {
  private http: HttpClient = inject(HttpClient);

  add(userId: number, houseId: number, params = {}) {
    return this.http.post(environment.backendUrl + `user/${userId}/houses/${houseId}/residents`, params)
  }

  edit(userId: number, houseId: number, personId: number, params = {}) {
    return this.http.put(environment.backendUrl + `user/${userId}/houses/${houseId}/residents/${personId}`, params);
  }
}
