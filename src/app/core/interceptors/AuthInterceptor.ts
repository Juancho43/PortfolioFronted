import { inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

const tokenService = inject(TokenService);
export function authIntercept(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> {
  const token = tokenService.getToken();
  if (token != undefined) {
    request = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }
  return next(request);
}
