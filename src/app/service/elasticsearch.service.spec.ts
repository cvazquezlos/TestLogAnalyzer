import {TestBed, inject} from '@angular/core/testing';
import {ElasticsearchService} from './elasticsearch.service';

describe('Service: Elasticsearch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElasticsearchService]
    })
  });

  it('Should create the service', inject([ElasticsearchService], (service: ElasticsearchService) => {
    expect(service).toBeTruthy();
  }));
});
