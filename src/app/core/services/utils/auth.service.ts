import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { CookieService } from '@services/utils/cookie.service';
import { ApiResponse } from '@model/ApiResponse';
import { checkToken } from '@core/guards/token.interceptor';
import { catchError, of, tap } from 'rxjs';
import { authEndpoint } from '@endpoints/auth.endpoint';
import { NotificationService } from '@services/utils/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private notification = inject(NotificationService);
  $login = this.isLoggedIn();

  sendLogin(data: { email: string; password: string }) {
    return this.http.post<ApiResponse<string>>(environment.api_url + authEndpoint.login, data).pipe(
      tap((res) => {
        this.login(res.data!);
        this.notification.showSuccesNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }

  sendLogout() {
    return this.http
      .post<ApiResponse<string>>(
        environment.api_url + authEndpoint.logout,
        {},
        {
          context: checkToken(),
        },
      )
      .pipe(
        tap(() => {
          this.logout();
          this.notification.showSuccesNotification();
        }),
        catchError(() => {
          this.notification.showErrorNotification();
          return of();
        }),
      );
  }
  sendPasswordReset(data: { new_password: string }) {
    return this.http
      .post<ApiResponse<string>>(environment.api_url + authEndpoint.passwordReset, data, {
        context: checkToken(),
      })
      .pipe(
        tap(() => {
          this.notification.showSuccesNotification();
          this.logout();
        }),

        catchError(() => {
          this.notification.showErrorNotification();
          return of();
        }),
      );
  }
  login(token: string) {
    this.saveToken(token);
    this.$login.set(true);
  }

  saveToken(token: string) {
    this.cookieService.saveCookie('token', token);
  }

  logout() {
    this.cookieService.removeCookie('token');
    this.$login.set(false);
  }

  getToken() {
    return this.cookieService.getCookie('token');
  }
  isLoggedIn() {
    return signal(this.getToken() !== undefined);
  }
}
