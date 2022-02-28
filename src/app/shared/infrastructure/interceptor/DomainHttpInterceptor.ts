import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../config';

@Injectable()
export class DomainHttpInterceptor implements HttpInterceptor {
  constructor(private config: Config) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cloneReq = req.clone({ url: this.config.apiUrl + req.url });
    return next.handle(cloneReq);
  }
}
