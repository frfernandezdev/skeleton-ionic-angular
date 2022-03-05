import type { Observable } from 'rxjs';
import type { HttpClientFactory } from './HttpClientFactory';

interface DTO {
  something: any;
}

export abstract class HttpRepository<T extends DTO> {
  protected abstract route: string;

  protected constructor(private http: HttpClientFactory) {}

  public find(endpoint: string = ''): Observable<T[]> {
    return this.http.get<T[]>(this.route + endpoint, {});
  }
}
