import {Headers, Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ElasticsearchService {

  URL = 'http://localhost:9200/logstash-*/_search?pretty';

  constructor(private http: Http) {
  }

  listAllLogsPaged(page?: number) {
  }

  listAllLogs(currentResults: number) {
    return this.http.get(this.URL + '&size=' + currentResults)
      .map( (responseData) => {
        console.log(responseData.json());
        return responseData.json();
      })
      .map((answer) => {
        let result: any[];
        result = [];
        if (answer) {
          answer.hits.hits.forEach(log => {
            result.push(log._source);
            console.log(log._source);
          })
        }
        return result;
      })
  }
}
