import { createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.action';
import { AppState } from '../app.state';

export const initialState: AppState = {
  auth_user: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, { auth_user }) => {
    console.log('auth_user:', auth_user);
    return {
      ...state,
      auth_user: auth_user,
    };
  }),
  on(logout, (state, { auth_user }) => ({
    ...state,
    auth_user: null,
  }))
);
