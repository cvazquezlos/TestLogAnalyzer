import {getTestBed, inject, TestBed} from '@angular/core/testing';
import {TableService} from './table.service';
import {HttpTestingController} from '@angular/common/http/testing';

describe('Service: Table', () => {
  let httpMock: HttpTestingController;
  let injector: TestBed;
  let service: TableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
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

  it('Should return a table which contains the diffs', () => {
    const diff = '<span>I am the very model of a </span><del style="background:#ffe6e6;">modern Major-General,¶<br>I\'ve' +
      ' information vegetable, animal, and mineral,¶<br>I know the kings of England, and I quote the fights historical,¶' +
      '<br>From Marathon to Waterloo, in order categorical</del><ins style="background:#e6ffe6;">cartoon individual,¶<br>' +
      'My animation\'s comical, unusual, and whimsical,¶<br>I\'m quite adept at funny gags, comedic theory I have read,¶' +
      '<br>From wicked puns and stupid jokes to anvils that drop on your head</ins><span>.</span>';
    const table = service.generateTable(diff);
    expect(table.length).toBeGreaterThan(-1);
  });
});
