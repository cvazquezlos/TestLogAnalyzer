import {Headers,
  Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ElasticsearchService {

  baseURL = 'http://localhost:9200/loganalyzer/';
  searchURL = this.baseURL + '_search';
  countURL  = this.baseURL + '_count';

  constructor(private http: Http) {
  }

  count(type: number, value?: string) {
    let getURL = this.countURL;
    switch (type) {
      case 0:
        break;
      case 1:
        getURL += '?q=thread_name:main';
        break;
      case 2:
        if (+value < 10) {
          value = '0' + value;
        }
        getURL += '?q=test_no:' + value;
        break;
    }
    return this.http.get(getURL)
      .map(response => response.json().count)
      .catch(error => Observable.throw('Fail trying to count all Elasticsearch logs.'));
  }

  submit(type: number, size?: number, page?: number, value?: string) {
    const getURL = this.searchURL + '?pretty&sort=id';
    const values1 = '&size=' + size;
    const values2 = '&from=' + page;
    switch (type) {
      case 0:
        return this.get(getURL + values1 + values2);
      case 1:
        return this.get(getURL + values1 + values2 + '&q=thread_name:main');
      case 2:
        if (+value < 10) {
          value = '0' + value;
        }
        return this.get(getURL + values1 + values2 + '&q=test_no:' + value)
    }
  }

  private get(getURL: string) {
    return this.http.get(getURL)
      .map((responseData) => {
        return responseData.json();
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
      })
      .catch(error => Observable.throw('Fail trying to submit logs.'));
  }
}
