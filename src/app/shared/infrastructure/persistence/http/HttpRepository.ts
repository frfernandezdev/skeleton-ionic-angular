import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { Criteria } from 'src/app/shared/domain/criteria/Criteria';
import { HttpCriteriaConverter } from './HttpCriteriaConverter';

interface DTO {
  something: any;
}

export abstract class HttpRepository<T extends DTO> {
  protected constructor(private http: HttpClient) {}

  public find<R = T | T[]>(
    endpoint?: string,
    criteria?: Criteria
  ): Observable<R> {
    const httpConvert = new HttpCriteriaConverter();
    return this.http.get<R>(endpoint, {
      params: httpConvert.convert(criteria),
    });
  }

  public findOne<R = T>(endpoint?: string): Observable<R> {
    return this.http.get<R>(endpoint, {});
  }

  public create<R = T | T[]>(endpoint?: string, body?: R): Observable<R> {
    return this.http.post<R>(endpoint, {
      body,
    });
  }

  public update<R = T | T[]>(
    endpoint?: string,
    criteria?: Criteria,
    body?: R
  ): Observable<R> {
    const httpConvert = new HttpCriteriaConverter();
    return this.http.put<R>(endpoint, {
      params: httpConvert.convert(criteria),
      body,
    });
  }

  public updateOne<R = T>(endpoint?: string, body?: R): Observable<R> {
    return this.http.patch<R>(endpoint, {
      body,
    });
  }

  public delete<R = T | T[]>(
    endpoint?: string,
    criteria?: Criteria
  ): Observable<R> {
    const httpConvert = new HttpCriteriaConverter();
    return this.http.delete<R>(endpoint, {
      params: httpConvert.convert(criteria),
    });
  }
}
