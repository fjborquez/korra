import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private http = inject(HttpClient);

  list(userId: number, houseId: number) {
    return this.http.get(environment.backendUrl + `user/${userId}/houses/${houseId}/inventory`);
  }

  discard(userId: number, houseId: number, inventoryId: number) {
    return this.http.put(environment.backendUrl + `user/${userId}/houses/${houseId}/inventory/${inventoryId}/discard`, {});
  }
}
