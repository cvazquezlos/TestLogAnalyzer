import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BreadcrumbsService} from 'ng2-breadcrumbs';
import {HttpClient} from '@angular/common/http';
import {Log} from "../../../../model/log.model";

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

  ngOnInit() {
    this.test = this.activatedRoute.snapshot.parent.params['exec'];
    this.project = this.activatedRoute.snapshot.parent.parent.params['project'];
    this.breadcrumbs.store([{label: 'Home', url: '/', params: []},
      {label: this.project, url: '/projects/' + this.project, params: []},
      {label: this.test, url: '/projects/' + this.project + '/' + this.test, params: []},
      {label: 'Reporting', url: '/projects/' + this.project + '/' + this.test + '/report', params: []}]);
    this.ready = false;
    this.http.get<string[]>('http://localhost:8443/logs/test/' + this.test + '?project=' + this.project + '&classes=true').subscribe(
      response => {
        this.classesL = [];
        for(let i = 0; i < response.length; i++) {
          const data = response[i].split(' ');
          if (data.length == 2) {
            const data2 = data[1].split('.');
            this.http.get<Log[]>('http://localhost:8443/logs/logger/' + data2[data2.length - 1] + '?project=' + this.project + '&test=' + this.test).subscribe(
              response2 => {
                this.classesL = this.classesL.concat({
                  'name': data[1],
                  'methods': response2
                });
              }
            );
          }
        };
        this.ready = true;
      });
  }

}
