import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {CountFormat} from '../model/count-format.model';
import {Execution} from '../model/execution.model';
import {Project} from '../model/project.model';
import {Tab} from '../model/tab.model';

@Injectable()
export class ElasticsearchService {

  baseAPIUrl = 'http://localhost:8443/';
  baseAPIExecutionsUrl = this.baseAPIUrl + 'api/executions';
  baseAPILogsUrl = this.baseAPIUrl + 'api/logs';
  baseAPIDiffMatchPatchUrl = this.baseAPIUrl + 'api/diff';
  baseAPIFilesUrl = this.baseAPIUrl + 'api/files';
  baseAPIProjectsUrl = this.baseAPIUrl + 'api/projects';
  baseELASTICSEARCHUrl = 'http://localhost:9200/';

  constructor(private http: HttpClient) {
  }

  getCountOfProjects() {
    return this.http.get<CountFormat>(this.baseELASTICSEARCHUrl + 'projects/_count').map(
      response => response.count,
      error => error
    )
  }

  async getExecutionsByProjectAndTabAsync(project: string, tab: string) {
    try {
      const response = await this.http.get<Execution[]>(this.baseAPIExecutionsUrl + '/project/' + project + '?tab='
        + tab).toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getExecutionByTestAsync(test_id: string) {
    try {
      const response = await this.http.get<Execution>(this.baseAPIExecutionsUrl + '/test/' + test_id).toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  deleteExecutionById(id: string) {
    return this.http.delete(this.baseAPIExecutionsUrl + '/id/' + id).map(
      response => response,
      error => error
    );
  }

  async getLogsByLoggerAsync(logger: string, project: string, test: string, method?: string) {
    try {
      let composedUrl = this.baseAPILogsUrl + '/logger/' + logger + '?project=' + project + '&test=' + test;
      if (method !== undefined) {
        composedUrl += '&method=' + method;
      }
      const response = await this.http.get<any[]>(composedUrl).toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getLogsByTestAsync(test: string, project: string, classes: boolean, maven?: boolean) {
    try {
      let composedUrl = this.baseAPILogsUrl + '/test/' + test + '?project=' + project + '&classes=' + classes;
      (composedUrl += '&maven=' + maven) && (maven);
      const response = await this.http.get<any[]>(composedUrl).toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  getProjectsAll() {
    return this.http.get<Project[]>(this.baseAPIProjectsUrl + '/all').map(
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

  async postProject(project: Project) {
    try {
      const headers: HttpHeaders = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('X-Requested-With', 'XMLHttpRequest');
      const object = {
        id: project.id,
        name: project.name,
        'num_execs': project.num_execs
      };
      const response = this.http.post(this.baseAPIProjectsUrl, object, {headers: headers}).toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  deleteProjectById(id: number) {
    return this.http.delete(this.baseAPIProjectsUrl + '/id/' + id).map(
      response => response,
      error => error
    );
  }

  async postFileByUpload(file: File) {
    try {
      const body = new FormData();
      body.append('file', file);
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/pdf');
      const response = await this.http.post(this.baseAPIFilesUrl + '/file', body, {headers: headers}).toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
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

  async postFileProject(project: string) {
    try {
      const body = JSON.stringify(project);
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'text/plain');
      const response = this.http.post(this.baseAPIFilesUrl + '/project', body, {headers: headers}).toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async postFileTab(tab: string) {
    try {
      const body = JSON.stringify(tab);
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'text/plain');
      const response = this.http.post(this.baseAPIFilesUrl + '/tab', body, {headers: headers}).toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

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
