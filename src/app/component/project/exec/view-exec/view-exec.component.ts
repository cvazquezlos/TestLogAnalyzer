import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ITdDataTableColumn} from '@covalent/core';
import {BreadcrumbsService} from 'ng2-breadcrumbs';
import {Log} from '../../../../model/log.model';

@Component({
  selector: 'app-view-exec',
  templateUrl: './view-exec.component.html',
  styleUrls: ['./view-exec.component.css']
})

export class ViewExecComponent implements OnInit {

  logsRowData: any[] = [];
  logsData: ITdDataTableColumn[] = [
    {name: 'id', label: 'Id', width: 100},
    {name: 'timestamp', label: 'Timestamp', width: 250},
    {name: 'thread', label: 'Thread', width: 150},
    {name: 'level', label: 'Level', width: 100},
    {name: 'message', label: 'Message'}
  ];
  mavenMessages = true;
  project: string;
  test: string;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private breadcrumbs: BreadcrumbsService,
              private router: Router) {
  }

  goTo() {
    this.router.navigate(['./', 'report'], {relativeTo: this.activatedRoute});
  }

  maven() {
    this.mavenMessages = !this.mavenMessages;
    this.reloadTable();
  }

  ngOnInit() {
    this.test = this.activatedRoute.snapshot.params['exec'];
    this.project = this.activatedRoute.snapshot.parent.parent.params['project'];
    this.breadcrumbs.store([{label: 'Home', url: '/', params: []},
      {label: this.project, url: '/projects/' + this.project, params: []},
      {label: this.test, url: '/projects/' + this.project + '/' + this.test, params: []}]);
    this.reloadTable();
  }

  reloadTable() {
    this.http.get<Log[]>('http://localhost:8443/logs/test/' + this.test + '?project=' + this.project + '&classes=' +
      'false&maven=' + this.mavenMessages).subscribe(response => {
      this.logsRowData = [];
      for (let i = 0; i < response.length; i++) {
        this.logsRowData[i] = {
          'id': response[i].id,
          'timestamp': response[i].timestamp,
          'thread': response[i].thread,
          'level': response[i].level,
          'message': response[i].message
        }
      }
    });
  }

}