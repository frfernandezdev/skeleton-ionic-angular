import type { Observable } from 'rxjs';
import { Criteria } from 'src/app/shared/domain/criteria/Criteria';
import type { HttpClientFactory } from './HttpClientFactory';
import { HttpCriteriaConverter } from './HttpCriteriaConverter';

interface DTO {
  something: any;
}

export abstract class HttpRepository<T extends DTO> {
  protected abstract route: string;

  protected constructor(private http: HttpClientFactory) {}

  public find<R = T | T[]>(
    endpoint?: string,
    criteria?: Criteria
  ): Observable<R> {
    const httpConvert = new HttpCriteriaConverter();
    return this.http.get<R>(this.route + endpoint, {
      params: httpConvert.convert(criteria),
    });
  }

  public findOne<R = T>(endpoint?: string): Observable<R> {
    return this.http.get<R>(this.route + endpoint, {});
  }

  public create<R = T | T[]>(endpoint?: string, body?: R): Observable<R> {
    return this.http.post<R>(this.route + endpoint, {
      body,
    });
  }

  public update<R = T | T[]>(
    endpoint?: string,
    criteria?: Criteria,
    body?: R
  ): Observable<R> {
    const httpConvert = new HttpCriteriaConverter();
    return this.http.put<R>(this.route + endpoint, {
      params: httpConvert.convert(criteria),
      body,
    });
  }

  public updateOne<R = T>(endpoint?: string, body?: R): Observable<R> {
    return this.http.patch<R>(this.route + endpoint, {
      body,
    });
  }

  public delete<R = T | T[]>(
    endpoint?: string,
    criteria?: Criteria
  ): Observable<R> {
    const httpConvert = new HttpCriteriaConverter();
    return this.http.delete<R>(this.route + endpoint, {
      params: httpConvert.convert(criteria),
    });
  }
}
