import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserAuth } from '../services/user-auth';
import { UserService } from '../services/user-service';

export const authGuard: CanActivateFn = (route, state) => {
  const userAuth = inject(UserAuth);
  const router = inject(Router);
  const userService = inject(UserService);

  // ✅ If user is NOT logged in → redirect to login
  if (!userAuth.isLoggedIn()) {
    router.navigate(['login']);
    return false;
  }

  // ✅ Check roles if defined on route
  const roles = route.data?.['roles'] as Array<string>;
  if (roles) {
    const hasRole = userService.roleMatch(roles);
    if (!hasRole) {
      router.navigate(['forbidden']);
      return false;
    }
  }

  return true; // ✅ Allow route
};
