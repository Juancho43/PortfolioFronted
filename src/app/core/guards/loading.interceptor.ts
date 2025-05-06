// src/app/core/interceptors/loading.interceptor.ts
import { HttpContext, HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '@services/utils/loading.service';
import { finalize } from 'rxjs/operators';

// Optional token to bypass loading for specific requests
export const BYPASS_LOADING = new HttpContextToken<boolean>(() => false);

export function bypassLoading() {
  return new HttpContext().set(BYPASS_LOADING, true);
}

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.startLoading();

  return next(req).pipe(
    finalize(() => {
      loadingService.stopLoading();
    }),
  );
};
