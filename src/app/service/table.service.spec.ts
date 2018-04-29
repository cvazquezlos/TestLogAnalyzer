import {TestBed, inject, getTestBed} from '@angular/core/testing';
import {TableService} from './table.service';
import {HttpTestingController} from '@angular/common/http/testing';
import {HttpClientTestingBackend} from '@angular/common/http/testing/src/backend';

describe('Service: Table', () => {
  let httpMock: HttpTestingController;
  let injector: TestBed;
  let service: TableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingBackend],
      providers: [TableService]
    });
    injector = getTestBed();
    service = injector.get(TableService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should create the service', inject([TableService], (s: TableService) => {
    expect(s).toBeTruthy();
  }));


});
