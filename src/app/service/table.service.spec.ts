import {TestBed, inject} from '@angular/core/testing';
import {TableService} from './table.service';

describe('Service: Table', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableService]
    })
  });

  it('Should create the service', inject([TableService], (service: TableService) => {
    expect(service).toBeTruthy();
  }));
});
