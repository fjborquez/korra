import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { map } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);

  login(params = {}) {
    return this.http.post(environment.backendUrl + 'auth/token', params).pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      map((response: any) => {
        localStorage.setItem('accessToken', response.message.access_token);
        localStorage.setItem('expiresIn', response.message.expires_in);
        localStorage.setItem('acquisitionTime', new Date().getTime().toString());
      })
    );
  }

  logout() {
    localStorage.clear();
  }

  getExpiration() {
    const expiresIn = localStorage.getItem("expiresIn");
    const acquisitionTime = localStorage.getItem("acquisitionTime");

    if (expiresIn !== null && acquisitionTime !== null) {
      return new Date(Number.parseInt(acquisitionTime) + Number.parseInt(expiresIn));
    }

    return null;
  }

  isLoggedIn() {
    const expirationDate = this.getExpiration();

    if (expirationDate) {
      return expirationDate >= new Date();
    }

    return false;
  }

  isUser() {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tokenDecoded: any = jwtDecode(accessToken);
      return tokenDecoded.scopes.includes("user");
    }

    return false;
  }

  getUserId() {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tokenDecoded: any = jwtDecode(accessToken);
      return tokenDecoded.sub;
    }

    return null;
  }
}
