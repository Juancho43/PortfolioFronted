import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { flush } from '@angular/core/testing';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.login) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};
