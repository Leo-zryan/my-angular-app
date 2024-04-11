import { AuthStore } from '../stores/auth.store';
import { catchError } from 'rxjs/operators';
import { ErrorModel } from '../models/error.model';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { SafeAny } from '../models/types';
import { Store } from '@ngxs/store';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}
  intercept(
    request: HttpRequest<SafeAny>,
    next: HttpHandler
  ): Observable<HttpEvent<SafeAny>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.store.dispatch(new AuthStore.Actions.Logout(''));
        }
        const error: ErrorModel = {
          message: err.error.message,
          status: err.status
        };
        return throwError(() => error);
      })
    );
  }
}
