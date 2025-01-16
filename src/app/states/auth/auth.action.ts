import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[AuthUser] Login',
  props<{ auth_user: any }>()
);
export const logout = createAction(
  '[AuthUser] Logout',
  props<{ auth_user: any }>()
);
