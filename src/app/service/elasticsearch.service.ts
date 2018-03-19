import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {CountFormat} from '../model/count-format.model';
import {Execution} from '../model/execution.model';
import {Log} from '../model/log.model';
import {Project} from '../model/project.model';
import {Tab} from '../model/tab.model';

@Injectable()
export class ElasticsearchService {

  baseAPIUrl = 'http://localhost:8443/';
  baseAPILogsUrl = this.baseAPIUrl + 'logs';
  baseAPIDiffMatchPatchUrl = this.baseAPIUrl + 'diff';
  baseAPIFilesUrl = this.baseAPIUrl + 'files';
  baseAPIProjectsUrl = this.baseAPIUrl + 'projects';
  baseAPITabsUrl = this.baseAPIUrl + 'tabs';
  baseELASTICSEARCHUrl = 'http://localhost:9200/';

  constructor(private http: HttpClient) {
  }

  // DIRECT ELASTICSEARCH FAST REQUESTS
  getCountOfProjects() {
    return this.http.get<CountFormat>(this.baseELASTICSEARCHUrl + 'projects/_count').map(
      response => response.count,
      error => error
    )
  }

  // LOG REQUESTS
  getLogById(id: string) {
    return this.http.get<Log>(this.baseAPILogsUrl + '/id/' + id).map(
      response => response,
      error => error
    );
  }

  getLogsByLevel(level: string, page?: string, size?: string) {
    let composedUrl = this.baseAPILogsUrl + '/level/' + level;
    (composedUrl += '?page=' + page) && (page);
    (composedUrl += '&size=' + size) && (size);
    return this.http.get<Log[]>(composedUrl).map(
      response => response,
      error => error
    );
  }

  async getLogsByLoggerAsync(logger: string, project: string, test: string, method?: string) {
    try {
      let composedUrl = this.baseAPILogsUrl + '/logger/' + logger + '?project=' + project + '&test=' + test;
      (composedUrl += '&method=' + method) && (method !== '');
      console.log(composedUrl);
      const response = await this.http.get<any[]>(composedUrl).toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  getLogsByLogger(logger: string, project: string, test: string, method?: string) {
    let composedUrl = this.baseAPILogsUrl + '/logger/' + logger + '?project=' + project + '&test=' + test;
    (composedUrl += '&method=' + method) && (method);
    return this.http.get<Log[]>(composedUrl).map(
      response => response,
      error => error
    );
  }

  async getLogsByProjectAsync(project: string, tab: string) {
    try {
      let composedUrl = this.baseAPILogsUrl + '/project/' + project + '?tab=' + tab;
      const response = await this.http.get<Execution[]>(composedUrl).toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  getLogsByProject(project: string, tab: string) {
    let composedUrl = this.baseAPILogsUrl + '/project/' + project + '?tab=' + tab;
    return this.http.get<Execution[]>(composedUrl).map(
      response => response,
      error => error
    );
  }

  async getLogsByTestAsync(test: string, project: string, classes: boolean, maven?: boolean) {
    try {
      console.log(maven);
      let composedUrl = this.baseAPILogsUrl + '/test/' + test + '?project=' + project + '&classes=' + classes;
      (composedUrl += '&maven=' + maven) && (maven);
      const response = await this.http.get<any[]>(composedUrl).toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  getLogsByTest(test: string, project: string, classes: boolean, maven?: boolean) {
    let composedUrl = this.baseAPILogsUrl + '/test/' + test + '?project=' + project + '&classes=' + classes;
    (composedUrl += '&maven=' + maven) && (maven);
    return this.http.get<Log[]>(composedUrl).map(
      response => response,
      error => error
    );
  }

  deleteLogsByTest(test: string, project: string) {
    let composedUrl = this.baseAPILogsUrl + '/remove/test/' + test + '?project=' + project;
    return this.http.delete<any>(composedUrl).map(
      response => response,
      error => error
    );
  }

  // PROJECT REQUESTS
  getProjectsAll() {
    return this.http.get<Project[]>(this.baseAPIProjectsUrl + '/all').map(
      response => response,
      error => error
    );
  }

  getProjectById(id: number) {
    return this.http.get<Project>(this.baseAPIProjectsUrl + '/id/' + id).map(
      response => response,
      error => error
    );
  }

  getProjectByName(name: string) {
    return this.http.get<Project>(this.baseAPIProjectsUrl + '/name/' + name).map(
      response => response,
      error => error
    );
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
    return this.http.post(this.baseAPIProjectsUrl, object, {headers: headers})
      .map(response => response);
  }

  deleteProjectById(id: number) {
    return this.http.delete(this.baseAPIProjectsUrl + '/remove/id/' + id).map(
      response => response,
      error => error
    );
  }

  // MEDIA REQUESTS
  postFileByUpload(file: File) {
    const body = new FormData();
    body.append('file', file);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/pdf');
    return this.http.post(this.baseAPIFilesUrl + '/file', body, {headers: headers}).map(
      response => response,
      error => error
    );
  }

  postFileByUrl(url: string) {
    const body = JSON.stringify(url);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'text/plain');
    return this.http.post(this.baseAPIFilesUrl + '/url', body, {headers: headers}).map(
      response => response,
      error => error
    );
  }

  postFileProject(project: string) {
    const body = JSON.stringify(project);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'text/plain');
    return this.http.post(this.baseAPIFilesUrl + '/project', body, {headers: headers}).map(
      response => response,
      error => error
    );
  }

  postFileTab(tab: string) {
    const body = JSON.stringify(tab);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'text/plain');
    return this.http.post(this.baseAPIFilesUrl + '/tab', body, {headers: headers}).map(
      response => response,
      error => error
    );
  }

  // TAB REQUESTS
  async getTabsByProjectAsync(project: string) {
    try {
      const response = await this.http.get<Tab[]>(this.baseAPITabsUrl + '/project/' + project).toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  getTabsByProject(project: string) {
    return this.http.get<Tab[]>(this.baseAPITabsUrl + '/project/' + project).map(
      response => response,
      error => error
    );
  }

  // DIFF MATCH PATCH REQUESTS
  async postDiff(text1: string, text2: string) {
    try {
      const body = {text1: text1, text2: text2};
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'text/plain');
      const response = await this.http.post(this.baseAPIDiffMatchPatchUrl, JSON.stringify(body), {
        headers: headers,
        responseType: 'text'
      }).toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
