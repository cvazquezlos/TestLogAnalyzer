import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {Log} from '../model/source.model';

class CountFormat {
  constructor(public _shards: Object,
              public count: number) {
  }
}

class RD {
  constructor(public took: number,
              public timed_out: boolean,
              public __shards: Object,
              public hits: AW) {
  }
}

class AW {
  constructor(public total: number,
              public max_score: any,
              public hits: ESResponse[]) {
  }
}

class ESResponse {
  constructor(public _index: string,
              public _type: string,
              public _id: string,
              public _score: any,
              public _source: Log,
              public sort: any[]) {
  }
}

@Injectable()
export class ElasticsearchService {

  baseURL = 'http://localhost:9200/loganalyzer/';
  searchURL = this.baseURL + '_search';
  countURL  = this.baseURL + '_count';

  constructor(private http: HttpClient) {
  }

  count(type: number, value?: string, method?: string, logger?: string) {
    let getURL = this.countURL;
    switch (type) {
      case 1:
        getURL += '?q=thread_name:main';
        break;
      case 2:
        (+value < 10) ? (value = '0' + value) : (value = value);
        getURL += '?q=test_no:' + value;
        break;
      case 3:
        (+value < 10) ? (value = '0' + value) : (value = value);
        const body = {query: {query_string: {query: '(method:' + method + '*) AND (test_no:' + value + ') AND ' +
              '(logger_name:' + logger + ')'}}};
        const headers: HttpHeaders = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post<CountFormat>(getURL, JSON.stringify(body), {headers: headers})
          .map(response => response.count);
      case 0:
    }
    return this.http.get<CountFormat>(getURL)
      .map(response => response.count);
  }

  get(type: number, size: number, value: string, maven: boolean, method?: string): Observable<Log[]> {
    const values1 = '&size=' + size;
    const values2 = '&from=0';
    const getURL = this.searchURL + '?pretty&sort=id' + values1 + values2;
    (+value < 10) ? (value = '0' + value) : (value = value);
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<RD>(getURL, JSON.stringify(this.getBody(type, value, maven, method)), {headers: headers})
      .map((responseData) => {
        return responseData;
      })
      .map((answer) => {
        let result: any[];
        result = [];
        if (answer) {
          answer.hits.hits.forEach(log => {
            result.push(log._source);
          })
        }
        return result;
      });
  }

  private getBody(id: number, value: string, maven: boolean, method?: string) {
    let body;
    if (maven && !method) {
      body = {query: {query_string: {query: '(test_no:' + value + ')'}}}
    } else {
      switch (id) {
        case 0:
          body = {query: {query_string: {query: '(thread_name:main) AND (test_no:' + value + ')'}}};
          break;
        case 1:
          body = {query: {query_string: {query: '(formatted_message:Starting) AND (test_no:' + value + ')'}}};
          break;
        case 2:
          body = {query: {query_string: {query: '(method:' + method + '*) AND (test_no:' + value + ')'}}};
          break;
        case 3:
          body = {query: {query_string: {query: '(formatted_message:Running) AND (test_no:' + value + ')'}}};
          break;
      }
    }
    return body;
  }
}
