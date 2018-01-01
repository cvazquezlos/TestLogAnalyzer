import {Headers,
  Http} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class ElasticsearchService {

  baseURL = 'http://localhost:9200/loganalyzer/';
  searchURL = this.baseURL + '_search';
  countURL  = this.baseURL + '_count';

  constructor(private http: Http) {
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
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(getURL, JSON.stringify(body), {headers: headers})
          .map(response => response.json().count);
      case 0:
    }
    return this.http.get(getURL)
      .map(response => response.json().count);
  }

  get(type: number, size: number, value: string, maven: boolean, method?: string) {
    const values1 = '&size=' + size;
    const values2 = '&from=0';
    const getURL = this.searchURL + '?pretty&sort=id' + values1 + values2;
    (+value < 10) ? (value = '0' + value) : (value = value);
    let body;
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(getURL, JSON.stringify(this.getBody(type, value, maven, method)), {headers: headers})
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
