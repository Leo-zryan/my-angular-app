import { jwtDecode } from 'jwt-decode';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
export namespace AuthStore {
  const name = 'AuthStore';
  interface Model {
    token: string;
    decodedToken: { [key: string]: string | number };
  }
  const defaults: Model = {
    token: '',
    decodedToken: {}
  };
  const TOKEN = new StateToken<Model>(name);
  export namespace Actions {
    export class Login {
      static readonly type = `[${name}] login`;
      constructor(
        public loginModel: LoginModel,
        public returnUrl: string
      ) {}
    }
    export class Logout {
      static readonly type = `[${name}] logout`;
      constructor(public returnUrl: string) {}
    }
  }
  @State<Model>({
    name: TOKEN,
    defaults
  })
  @Injectable()
  export class States {
    constructor(
      private router: Router,
      private authService: AuthService,
      private message: NzMessageService
    ) {}
    @Action(Actions.Login)
    login(ctx: StateContext<Model>, payload: Actions.Login) {
      return this.authService.auth(payload.loginModel).pipe(
        tap({
          next: result => {
            ctx.patchState({
              token: result.token,
              decodedToken: jwtDecode(result.token)
            });
            this.router.navigateByUrl(payload.returnUrl);
          },
          error: error => {
            this.message.create('error', error.message);
          }
        })
      );
    }
    @Action(Actions.Logout)
    logout(ctx: StateContext<Model>, payload: Actions.Logout) {
      ctx.setState(defaults);
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: payload.returnUrl }
      });
    }
  }
  export class Selectors {
    @Selector([TOKEN])
    static token(state: Model) {
      return state.token;
    }
    @Selector([TOKEN])
    static user(state: Model) {
      return state.decodedToken?.['name'];
    }
    @Selector([TOKEN])
    static isTokenExpired(state: Model) {
      const expiryTime: number = state.decodedToken?.['exp'] as number;
      if (expiryTime) {
        return 1000 * expiryTime - new Date().getTime() < 5000;
      } else {
        return false;
      }
    }
    @Selector([TOKEN])
    static isTokenValid(state: Model) {
      return true;
      return this.user(state) && !this.isTokenExpired(state);
    }
  }
}
