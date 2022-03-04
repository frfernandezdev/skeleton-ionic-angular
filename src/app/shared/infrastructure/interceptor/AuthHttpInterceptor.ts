import type {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { LocalStorageFactory } from '../persistence/local-storage/LocalStorageFactory';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  public constructor(private localstorage: LocalStorageFactory) {}

  public intercept(
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
