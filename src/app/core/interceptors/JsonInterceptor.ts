import {
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export function jsonInterceptor(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  request = request.clone({ headers });

  return next(request);
}
