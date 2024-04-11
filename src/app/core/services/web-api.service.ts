import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SafeAny } from '../models/types';

@Injectable()
export class WebApiService {
  constructor(protected http: HttpClient) {}
  private getHttpHeaders(): HttpHeaders {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('accept', 'application/json');
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Cache-control', 'no-cache');
    httpHeaders = httpHeaders.append('Cache-control', 'no-store');
    httpHeaders = httpHeaders.append('Expires', '0');
    httpHeaders = httpHeaders.append('Pragma', 'no-cache');
    return httpHeaders;
  }
  private getHttpParams(param?: SafeAny): HttpParams {
    let httpParams: HttpParams = new HttpParams();
    if (!!param) {
      for (const item in param) {
        if (param.hasOwnProperty(item)) {
          httpParams = httpParams.append(item, param[item]);
        }
      }
    }
    return httpParams;
  }
  private prependUrl(url: string): string {
    return `${environment.baseUrl}/api/${url}`;
  }
  protected get<T>(url: string, param?: SafeAny): Observable<T> {
    const params = typeof param === 'object' ? this.getHttpParams(param) : {};
    return this.http.get<T>(this.prependUrl(url), {
      headers: this.getHttpHeaders(),
      params: params
    });
  }
  protected getBlob(url: string, param?: SafeAny): Observable<Blob> {
    const params = typeof param === 'object' ? this.getHttpParams(param) : {};
    return this.http.get(this.prependUrl(url), {
      headers: this.getHttpHeaders(),
      params: params,
      responseType: 'blob'
    });
  }
  protected post<T>(url: string, param?: SafeAny): Observable<T> {
    return this.http.post<T>(this.prependUrl(url), param, {
      headers: this.getHttpHeaders()
    });
  }
  protected put<T>(url: string, param?: SafeAny): Observable<T> {
    return this.http.put<T>(this.prependUrl(url), param);
  }
  protected patch<T>(url: string, param?: SafeAny): Observable<T> {
    return this.http.patch<T>(this.prependUrl(url), param);
  }
  protected delete<T>(url: string, param?: SafeAny): Observable<T> {
    return this.http.delete<T>(this.prependUrl(url), {
      headers: this.getHttpHeaders(),
      params: this.getHttpParams(param)
    });
  }
}
