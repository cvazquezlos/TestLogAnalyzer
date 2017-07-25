import {Headers, Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ElasticsearchService {

  URL = "http://localhost:9200/logstash-*/_search?pretty";

  constructor(private http: Http) {
  }

  listAllLogsPaged(page?: number) {
  }

  listAllLogs() {
    return this.http.get(this.URL)
      .map(response => console.log(response.json()))
      .catch(error => Observable.throw('Server error'));
  }
}
