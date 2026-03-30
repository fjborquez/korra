import { JwtPayload } from './../interfaces/jwt-payload.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { map } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Response } from '../interfaces/response.interface';
import { Token } from '../interfaces/token.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);

  login(params = {}) {
    return this.http.post<Response>(environment.backendUrl + 'auth/token', params).pipe(
      map((response: Response) => {
        const token: Token = response.message as Token;
        localStorage.setItem('accessToken', token.access_token);
        localStorage.setItem('expiresIn', token.expires_in.toString());
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
      const tokenDecoded: JwtPayload = jwtDecode(accessToken);
      return tokenDecoded.scopes.includes("user");
    }

    return false;
  }

  getUserId(): number {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const tokenDecoded: JwtPayload = jwtDecode(accessToken);
      return Number(tokenDecoded.sub);
    }

    throw new Error('No user id in token');
  }
}
