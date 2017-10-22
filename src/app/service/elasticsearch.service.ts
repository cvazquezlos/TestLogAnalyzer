import {Headers, Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ElasticsearchService {

  URL = 'http://localhost:9200/loganalyzer/_search';

  constructor(private http: Http) {
  }

  get(type: number, from?: string, to?: string) {
    let getURL = this.URL + '?pretty&sort=id';
    switch (type) {
      case 0:
        break;
      case 1:
        getURL += '&q=threadName:main';
        break;
      case 2:
        this.post(getURL, from, to);
        break;
    }
    return this.http.get(this.URL)
      .map((responseData) => {
        return responseData.json();
      })
      .map((answer) => {
        let result = [];
        if (answer) {
          answer.hits.hits.forEach(log => {
            result.push(log._source);
          })
        }
        return result;
      })
      .catch(error => Observable.throw('Fail trying to get all Elasticsearch logs.'));
  }

  post(getURL: string, from: string, to: string) {
    const body = {
      query: {
        range: {
          '@timestamp': {
            gte: from.toString(),
            lte: to.toString()
          }
        }
      }
    };
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.URL, JSON.stringify(body), {headers: headers})
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
      .catch(error => Observable.throw('Fail trying to get logs between ' + from.toString() + ' and ' + to.toString()));
  }
}
