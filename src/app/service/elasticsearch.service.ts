import {Headers, Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ElasticsearchService {

  URL = 'http://localhost:9200/logstash-*/_search';

  constructor(private http: Http) {
  }

  listAllLogs(currentResults: number) {
    return this.http.get(this.URL + '?pretty&size=' + currentResults)
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
      .catch(error => Observable.throw('Fail trying to get all Elasticsearch logs.'));
  }

  listAllLogsBetweenDates(from: string, to: string) {
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
    return this.http.post(this.URL, JSON.stringify(body), { headers: headers })
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
      .catch(error => Observable.throw('Fail trying to get logs between ' + from.toString() + ' and ' + to.toString()));
  }

  listAllLogsByDate(date: string) {
    const body = {
      query: {
        match: {
          timestamp: date
        }
      }
    };
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.URL, JSON.stringify(body), { headers: headers })
      .map(response => console.log(response))
      .catch(error => Observable.throw('Fail'));
  }
}
