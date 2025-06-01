import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { CookieService } from '@services/utils/cookie.service';
import { ApiResponse } from '@model/ApiResponse';
import { checkToken } from '@core/guards/token.interceptor';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  login$ = new BehaviorSubject<boolean>(false);
  $lastLogin = signal<Date>(new Date());

  sendLogin(data: { email: string; password: string }) {
    return this.http.post<ApiResponse<string>>(environment.api_url + '/login', data);
  }

  sendLogout() {
    return this.http.post<ApiResponse<string>>(environment.api_url + '/logout',{}, {
      context: checkToken(),
    });
  }

  login(token: string) {
    this.saveToken(token);
    this.login$.next(true);
    this.$lastLogin.set(new Date());
  }

  saveToken(token: string) {
    this.cookieService.saveCookie('token', token);
  }

  logout() {
    this.cookieService.removeCookie('token');
    this.login$.next(false);
  }

  getToken() {
    return this.cookieService.getCookie('token');
  }

  isLoggedIn() {
    if (this.getToken() !== undefined) {
      this.login$.next(true);
    } else {
      this.login$.next(false);
    }
    return this.login$.getValue();
  }
}
