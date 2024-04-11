import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot
} from '@angular/router';
import { AuthStore } from '../stores/auth.store';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(Store);
  const isValid = store.selectSnapshot(AuthStore.Selectors.isTokenValid);
  if (isValid) {
    return true;
  } else {
    store.dispatch(new AuthStore.Actions.Logout(state.url));
    return false;
  }
};
