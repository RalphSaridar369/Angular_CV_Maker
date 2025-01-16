import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectAppState = createFeatureSelector<AppState>('auth_user');

export const getUserAuth = createSelector(
  selectAppState,
  (state: AppState) => state
);
