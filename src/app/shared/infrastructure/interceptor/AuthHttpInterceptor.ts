import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageFactory } from '../persistence/local-storage/LocalStorageFactory';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(private localstorage: LocalStorageFactory) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.localstorage.get('token');

    if (!token) {
      return next.handle(req);
    }

    const cloneReq = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      },
    });
    return next.handle(cloneReq);
  }
}
