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

  count(type: number, value?: string, method?: string, logger?: string) {
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
      case 3:
        if (+value < 10) {
          value = '0' + value;
        }
        let body = {
          query: {
            query_string: {
              query: '(method:' + method + '*) AND (test_no:' + value + ') AND (logger_name:' + logger + ')'
            }
          }
        };
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(getURL, JSON.stringify(body), {headers: headers})
          .map(response => response.json().count)
          .catch(error => Observable.throw('Fail trying to count all Elasticsearch logs.'));
    }
    return this.http.get(getURL)
      .map(response => response.json().count)
      .catch(error => Observable.throw('Fail trying to count all Elasticsearch logs.'));
  }

  get(type: number, size: number, value: string, maven: boolean, method?: string) {
    const values1 = '&size=' + size;
    const values2 = '&from=0';
    const getURL = this.searchURL + '?pretty&sort=id' + values1 + values2;
    if (+value < 10) {
      value = '0' + value;
    }
    let body;
    if (maven && !method) {
      body = {
        query: {
          query_string: {
            query: '(test_no:' + value + ')'
          }
        }
      }
    } else {
      switch (type) {
        case 0:
          body = {
            query: {
              query_string: {
                query: '(thread_name:main) AND (test_no:' + value + ')'
              }
            }
          };
          break;
        case 1:
          body = {
            query: {
              query_string: {
                query: '(formatted_message:Starting) AND (test_no:' + value + ')'
              }
            }
          };
          break;
        case 2:
          body = {
            query: {
              query_string: {
                query: '(method:' + method + '*) AND (test_no:' + value + ')'
              }
            }
          };
          break;
        case 3:
          body = {
            query: {
              query_string: {
                query: '(formatted_message:Running) AND (test_no:' + value + ')'
              }
            }
          };
          break;
      }
    }
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(getURL, JSON.stringify(body), {headers: headers})
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
      .catch(error => Observable.throw('Fail trying to get some logs from your Elasticsearch instance.'))
  }
}
