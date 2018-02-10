import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BreadcrumbsService} from 'ng2-breadcrumbs';
import {HttpClient} from '@angular/common/http';
import {Log} from '../../../../model/log.model';

@Component({
  selector: 'app-report-comparison',
  templateUrl: './report-comparison.component.html',
  styleUrls: ['./report-comparison.component.css']
})

export class ReportComparisonComponent implements OnInit {

  classesL: any[];
  project: string;
  ready: boolean;
  test: string;

  constructor(private activatedRoute: ActivatedRoute, private breadcrumbs: BreadcrumbsService, private http: HttpClient) {
  }

  async ngOnInit() {
    this.test = this.activatedRoute.snapshot.parent.params['exec'];
    this.project = this.activatedRoute.snapshot.parent.parent.params['project'];
    this.breadcrumbs.store([{label: 'Home', url: '/', params: []},
      {label: this.project, url: '/projects/' + this.project, params: []},
      {label: this.test, url: '/projects/' + this.project + '/' + this.test, params: []},
      {label: 'Reporting', url: '/projects/' + this.project + '/' + this.test + '/report', params: []}]);
    this.ready = false;
    const loggers = await this.getLoggers();
    for (let i = 0; i < loggers.length; i++) {
      if (loggers[i].split(' ').length === 2) {
        const logger = loggers[i].split(' ')[1];
        const partialLogger = logger.split('.')[logger.split('.').length - 1];
        const methods = await this.getMethodsByPartialLogger(partialLogger);
        let logs = [];
        for (let j = 0; j < methods.length; j++) {
          logs.push(await this.getLogs(partialLogger, methods[j].replace('(', '').replace(')', '')));
        }
        console.log(logs);
      }
    }
    this.ready = true;
  }

  private async getLoggers() {
    try {
      let response = await this.http.get<string[]>('http://localhost:8443/logs/test/' + this.test + '?project=' + this.project
        + '&classes=true').toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  private async getLogs(partialLogger: string, method: string) {
    try {
      let response = await this.http.get<string[]>('http://localhost:8443/logs/logger/' + partialLogger + '?project=' + this.project
        + '&test=' + this.test + '&method=' + method).toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  private async getMethodsByPartialLogger(partialLogger: string) {
    try {
      let response = await this.http.get<string[]>('http://localhost:8443/logs/logger/' + partialLogger + '?project=' + this.project
        + '&test=' + this.test).toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

}
