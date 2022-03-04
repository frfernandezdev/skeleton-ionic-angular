import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LocalStorageFactory } from '../../persistence/local-storage/LocalStorageFactory';
import { AuthHttpInterceptor } from '../AuthHttpInterceptor';

describe('AuthHttpInterceptor', () => {
  @Injectable()
  class TestService {
    constructor(private http: HttpClient) {}

    getItems() {
      return this.http.get('/testing');
    }
  }

  let service: TestService;
  let localstorage: LocalStorageFactory;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LocalStorageFactory,
        TestService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHttpInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.get(TestService);
    localstorage = TestBed.get(LocalStorageFactory);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    localstorage.remove('token');
  });

  it('should add an Authorization header', () => {
    let token = 'adef8egjac09sd9r';
    localstorage.add('token', token);
    service.getItems().subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne('/testing');

    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
    expect(httpRequest.request.headers.get('Authorization')).toEqual(
      `Bearer ${token}`
    );
  });

  it("shouldn't have Authorization header", () => {
    service.getItems().subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne('/testing');

    expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();
    expect(httpRequest.request.headers.get('Authorization')).toBeNull();
  });
});
