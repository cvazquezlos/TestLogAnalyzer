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

  count(type: number) {
    let getURL = this.countURL;
    switch (type) {
      case 0:
        break;
      case 1:
        getURL += '?q=thread_name:main';
        break;
    }
    return this.http.get(getURL)
      .map(response => response.json().count)
      .catch(error => Observable.throw('Fail trying to count all Elasticsearch logs.'));
  }

  submit(type: number, size: number, page: number, value1?: string, value2?: string) {
    const getURL = this.searchURL + '?pretty&sort=id';
    const values1 = '&size=' + size;
    const values2 = '&from=' + page;
    switch (type) {
      case 0:
        return this.get(getURL + values1 + values2);
      case 1:
        return this.get(getURL + values1 + values2 + '&q=thread_name:main');
      case 2:
        return this.post(0, getURL, value1, value2);
      case 3:
        return this.post(1, getURL, value1);
      case 4:
        return this.get(getURL + values1);
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
            console.log(log._source);
            result.push(log._source);
          })
        }
        return result;
      })
      .catch(error => Observable.throw('Fail trying to submit logs.'));
  }

  private post(code: number, getURL: string, value1?: string, value2?: string) {
    let body;
    switch (code) {
      case 0:
        body = {
          query: {
            range: {
              timestamp: {
                gte: value1.toString(),
                lte: value2.toString()
              }
            }
          }
        };
        break;
      case 1:
        body = {
          query : {
            match_phrase : {
              formatted_message : value1
            }
          }
        };
        break;
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
      .catch(error => Observable.throw('Fail trying to submit logs. Code ' + code + '.'));
  }
}
