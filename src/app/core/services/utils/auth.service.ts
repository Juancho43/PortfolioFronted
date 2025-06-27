import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { CookieService } from '@services/utils/cookie.service';
import { ApiResponse } from '@model/ApiResponse';
import { checkToken } from '@core/guards/token.interceptor';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { authEndpoint } from '@endpoints/auth.endpoint';
import { NotificationService } from '@services/utils/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private notification = inject(NotificationService);
  login$ = new BehaviorSubject<boolean>(false);
  $lastLogin = signal<Date>(new Date());

  sendLogin(data: { email: string; password: string }) {
    return this.http.post<ApiResponse<string>>(environment.api_url + authEndpoint.login, data).pipe(
      tap(() => {
        this.notification.showSuccesNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }

  sendLogout() {
    return this.http.post<ApiResponse<string>>(environment.api_url + authEndpoint.logout,{}, {
      context: checkToken(),
    }).pipe(
      tap(() => {
        this.notification.showSuccesNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }
  sendPasswordReset(data: {new_password: string}) {
    return this.http.post<ApiResponse<string>>(environment.api_url + authEndpoint.passwordReset, data, {
      context: checkToken(),
    }).pipe(
      tap(() => {
        this.notification.showSuccesNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
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
