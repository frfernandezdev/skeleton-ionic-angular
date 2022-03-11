import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../persistence/http/HttpConfig';

@Injectable()
export class DomainHttpInterceptor implements HttpInterceptor {
  public constructor(private config: Config) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cloneReq = req.clone({
      url: this.config.apiUrl + req.urlWithParams,
    });
    return next.handle(cloneReq);
  }
}
