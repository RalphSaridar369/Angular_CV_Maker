import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  if (!sessionStorage.getItem('user_auth')) {
    router.navigate(['auth']);
    return false;
  }
  return true;
};
