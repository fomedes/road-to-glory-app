import { createReducer, on } from '@ngrx/store';
import { login, logout } from '../actions/auth.action';

export interface AuthState {
  isLoggedIn: boolean;
}

export const initialState: AuthState = {
  isLoggedIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, isLoggedIn: true })),
  on(logout, (state) => ({ ...state, isLoggedIn: false }))
);
