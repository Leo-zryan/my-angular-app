import { AuthStore } from '../stores/auth.store';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SafeAny } from '../models/types';
import { Store } from '@ngxs/store';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}
  intercept(req: HttpRequest<SafeAny>, next: HttpHandler) {
    const token = this.store.selectSnapshot(AuthStore.Selectors.token);
    req = req.clone({
      url: req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(req);
  }
}
