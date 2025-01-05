import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  console.log('first');
  if (!localStorage.getItem('user')) {
    router.navigate(['auth']);
    return false;
  }
  return true;
};
