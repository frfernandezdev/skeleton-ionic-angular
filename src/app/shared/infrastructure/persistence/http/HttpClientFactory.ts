import type { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import type { Config } from './HttpConfig';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

@Injectable()
export class HttpClientFactory {
  private api: string;

  public constructor(private http: HttpClient, config: Config) {
    this.api = config.apiUrl;
  }

  public get<T>(endpoint: string, options: IRequestOptions): Observable<T> {
    return this.http.get<T>(this.api + endpoint, options);
  }

  public post<T>(endpoint: string, options: IRequestOptions): Observable<T> {
    return this.http.post<T>(this.api + endpoint, options);
  }

  public put<T>(endpoint: string, options: IRequestOptions): Observable<T> {
    return this.http.put<T>(this.api + endpoint, options);
  }

  public patch<T>(endpoint: string, options: IRequestOptions): Observable<T> {
    return this.http.patch<T>(this.api + endpoint, options);
  }

  public delete<T>(endpoint: string, options: IRequestOptions): Observable<T> {
    return this.http.delete<T>(this.api + endpoint, options);
  }
}
