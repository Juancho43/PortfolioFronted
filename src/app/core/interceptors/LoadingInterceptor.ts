import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '@services/utils/loading.service';
import { inject } from '@angular/core';

const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  let loadingService = inject(LoadingService);

  return next(req).pipe(finalize(() => {}));
};

export default loadingInterceptor;
