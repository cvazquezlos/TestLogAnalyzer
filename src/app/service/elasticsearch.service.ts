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
        getURL += '?q=threadName:main';
        break;
    }
    return this.http.get(getURL)
      .map(response => response.json().count)
      .catch(error => Observable.throw('Fail trying to count all Elasticsearch logs.'));
  }

  submit(type: number, size: number, page: number, from?: string, to?: string) {
    let getURL = this.searchURL + '?pretty&sort=id';
    const values = '&size=' + size + '&from=' + page;
    switch (type) {
      case 0:
        return this.get(getURL + values);
      case 1:
        getURL += values + '&q=threadName:main';
        return this.get(getURL);
      case 2:
        return this.post(this.searchURL, from, to);
      case 3:
        break;
    }
  }

  private get(getURL: string) {
    return this.http.get(getURL)
      .map((responseData) => {
        console.log('Response data: ' + responseData.json());
        return responseData.json();
      })
      .map((answer) => {
        let result: any[];
        result = [];
        if (answer) {
          answer.hits.hits.forEach(log => {
            console.log('Answer: ' + log._source);
            result.push(log._source);
          })
        }
        return result;
      })
      .catch(error => Observable.throw('Fail trying to submit all Elasticsearch logs.'));
  }

  private post(getURL: string, from: string, to: string) {
    const body = {
      query: {
        range: {
          'timestamp': {
            gte: "2017-10-20 19:27:03.027",
            lte: "2017-10-23 19:27:03.027"
          }
        }
      }
    };
    const headers: Headers = new Headers();
    console.log(JSON.stringify(body));
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.searchURL, JSON.stringify(body), {headers: headers})
      .map((responseData) => {
      console.log(responseData.json());
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
      .catch(error => Observable.throw('Fail trying to submit logs between ' + from.toString() + ' and ' + to.toString()));
  }
}
