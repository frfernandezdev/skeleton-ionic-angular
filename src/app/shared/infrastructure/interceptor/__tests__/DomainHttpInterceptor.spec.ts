import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Config } from '../../config';
import { DomainHttpInterceptor } from '../DomainHttpInterceptor';

describe('DomainHttpInterceptor', () => {
  @Injectable()
  class TestService {
    constructor(private http: HttpClient) {}

    getItems() {
      return this.http.get('/testing');
    }
  }

  let service: TestService;
  let config: Config;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        Config,
        TestService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: DomainHttpInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.get(TestService);
    config = TestBed.get(Config);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should add base url to request', () => {
    const apiUrl = `${config.apiUrl}/testing`;
    service.getItems().subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(apiUrl);

    expect(httpRequest.request.url).toEqual(apiUrl);
  });
});
