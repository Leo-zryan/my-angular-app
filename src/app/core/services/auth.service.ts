import { AuthModel } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { WebApiService } from 'src/app/core/services/web-api.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends WebApiService {
  constructor(protected override http: HttpClient) {
    super(http);
  }
  private controller = 'auth';
  auth(param: LoginModel) {
    const url = `${this.controller}`;
    return this.post<AuthModel>(url, param);
  }
}
