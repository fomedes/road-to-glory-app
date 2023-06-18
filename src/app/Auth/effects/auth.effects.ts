import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { login, logout } from '../actions/auth.action';
import { AuthState } from '../reducers';

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
        tap(() => {
          this.router.navigateByUrl('dashboard');
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        withLatestFrom(this.store.select('isLoggedIn')),
        tap(([action, isLoggedIn]: [any, boolean]) => {
          if (isLoggedIn) {
            //this.localStorageService.setLoggedIn(false);
            this.router.navigateByUrl('login');
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private localStorageService: LocalStorageService,
    private store: Store<AuthState>
  ) {}
}
