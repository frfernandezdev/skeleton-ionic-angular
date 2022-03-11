import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Config } from '../../persistence/http/HttpConfig';
import { DomainHttpInterceptor } from '../DomainHttpInterceptor';

describe('DomainHttpInterceptor', () => {
  @Injectable()
  class TestConfig implements Config {
    public apiUrl = 'http://localhost';
  }
  @Injectable()
  class TestService {
    constructor(private http: HttpClient) {}

    getItems() {
      return this.http.get('/testing');
    }
  }

  let service: TestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TestService,
        {
          provide: Config,
          useClass: TestConfig,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: DomainHttpInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.get(TestService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should add domain to request', () => {
    service.getItems().subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne('http://localhost/testing');

    expect(httpRequest.request.url).toBeTruthy();
    expect(httpRequest.request.url).toEqual('http://localhost/testing');
  });
});
