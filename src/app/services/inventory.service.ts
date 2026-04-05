import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Response } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private http = inject(HttpClient);

  add(userId: number, houseId: number, params = {}) {
    return this.http.post(environment.backendUrl + `user/${userId}/houses/${houseId}/inventory`, params)
  }

  list(userId: number, houseId: number) {
    return this.http.get<Response>(environment.backendUrl + `user/${userId}/houses/${houseId}/inventory`);
  }

  discard(userId: number, houseId: number, inventoryId: number) {
    return this.http.put(environment.backendUrl + `user/${userId}/houses/${houseId}/inventory/${inventoryId}/discard`, {});
  }

  consume(userId: number, houseId: number, inventoryId: number) {
    return this.http.put(environment.backendUrl + `user/${userId}/houses/${houseId}/inventory/${inventoryId}/consume`, {});
  }
}
