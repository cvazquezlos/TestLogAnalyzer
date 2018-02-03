import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {CountFormat} from '../model/count-format.model';
import {Execution} from '../model/execution.model';
import {RD} from '../model/get-format.model';
import {Log} from '../model/log.model';
import {Project} from '../model/project.model';

@Injectable()
export class ElasticsearchService {

  baseElasticUrl = 'http://localhost:9200/loganalyzer/';
  baseProjectsUrl = 'http://localhost:9200/projects/';
  baseAPIUrl = 'http://localhost:8443/';
  searchURL = this.baseElasticUrl + '_search';
  countURL  = this.baseElasticUrl + '_count';
  countProjectsURL  = this.baseProjectsUrl + '_count';

  constructor(private http: HttpClient) {
  }

  count(type: number, valueMethodLogger: string[]) {
    let getURL = this.countURL;
    switch (type) {
      case 1:
        getURL += '?q=thread_name:main';
        break;
      case 2:
        (+valueMethodLogger[0] < 10) && (valueMethodLogger[0] = '0' + valueMethodLogger[0]);
        getURL += '?q=test_no:' + valueMethodLogger[0];
        break;
      case 3:
        (+valueMethodLogger[0] < 10) && (valueMethodLogger[0] = '0' + valueMethodLogger[0]);
        const body = {query: {query_string: {query: '(method:' + valueMethodLogger[1] + '*) ' +
              'AND (test_no:' + valueMethodLogger[0] + ') AND ' +
              '(logger_name:' + valueMethodLogger[2] + ')'}}};
        const headers: HttpHeaders = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post<CountFormat>(getURL, JSON.stringify(body), {headers: headers})
          .map(response => response.count);
      case 0:
    }
    return this.http.get<CountFormat>(getURL)
      .map(response => response.count);
  }

  postProject(project: Project) {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Requested-With', 'XMLHttpRequest');
    const object = {
      id: project.id,
      name: project.name,
      'num_execs': project.num_execs
    };
    return this.http.post(this.baseAPIUrl + 'projects', object, {headers: headers})
      .map(response => response);
  }

  getProjectByName(name: string) {
    return this.http.get<Project>(this.baseAPIUrl + 'projects/name/' + name)
      .map(response => {return response});
  }

  getProjects() {
    return this.http.get<any>(this.baseAPIUrl + 'projects/all')
      .map(response => {
        const result = [];
        for (let i = 0; i < response.length; i++) {
          result[i] = response[i]
        }
        return result;
      });
  }

  loadExecutionsByProject(project: string) {
    return this.http.get<Execution[]>(this.baseAPIUrl + 'logs/project/' + project)
      .map(response => response);
  }

  countProjects() {
    return this.http.get<CountFormat>(this.countProjectsURL)
      .map(response => response.count);
  }

  deleteProject(id: number) {
    return this.http.delete(this.baseAPIUrl + 'projects/remove/' + id.toString())
      .map(response => response);
  }

  get(typeSize: number[], valueMethod: string[], maven: boolean): Observable<Log[]> {
    const values1 = '&size=' + typeSize[1];
    const values2 = '&from=0';
    const getURL = this.searchURL + '?pretty&sort=id' + values1 + values2;
    (+valueMethod[0] < 10) && (valueMethod[0] = '0' + valueMethod[0]);
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<RD>(getURL, JSON.stringify(this.getBody(typeSize[0], valueMethod[0], maven, valueMethod[1])), {headers: headers})
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
        case 4:
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
