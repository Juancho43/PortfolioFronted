import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/utils/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.$login()) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};
