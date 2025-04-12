import { inject, Injectable } from '@angular/core';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private _login = true;
  private _lastLogin: Date = new Date();

  sendLogin(data: { email: string; password: string }) {
    return this.http.post(environment.api_url + '/login', data);
  }

  get login(): boolean {
    return this._login;
  }

  set login(value: boolean) {
    this._login = value;
  }

  get lastLogin(): Date {
    return this._lastLogin;
  }

  set lastLogin(value: Date) {
    this._lastLogin = value;
  }

  saveToken(token: string) {
    setCookie('token', token, { expires: 365, path: '/' });
  }

  getToken() {
    return getCookie('token');
  }

  removeToken() {
    removeCookie('token');
  }
}
