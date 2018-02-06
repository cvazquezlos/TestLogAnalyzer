import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ITdDataTableColumn} from '@covalent/core';
import {Log} from '../../../model/log.model';

@Component({
  selector: 'app-view-exec',
  templateUrl: './view-exec.component.html',
  styleUrls: ['./view-exec.component.css']
})

export class ViewExecComponent {

  logsRowData: any[] = [];
  logsData: ITdDataTableColumn[] = [
    {name: 'id', label: 'Id', width: 100},
    {name: 'timestamp', label: 'Timestamp', width: 250},
    {name: 'thread', label: 'Thread', width: 150},
    {name: 'level', label: 'Level', width: 100},
    {name: 'logger', label: 'Logger'},
    {name: 'message', label: 'Message'}
  ];
  project: string;
  test: string;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
    this.test = this.activatedRoute.snapshot.params['exec'];
    this.project = this.activatedRoute.snapshot.params['project'];
    this.reloadTable();
  }

  reloadTable() {
    console.log(this.project);
    this.http.get<Log[]>('http://localhost:8443/logs/test/' + this.test + '?project=' + this.project).subscribe(response => {
      this.logsRowData = [];
      console.log(response);
      for (let i = 0; i < response.length; i++) {
        this.logsRowData[i] = {
          'id': response[i].id,
          'timestamp': response[i].timestamp,
          'thread': response[i].thread,
          'level': response[i].level,
          'logger': response[i].logger,
          'message': response[i].message
        }
      }
    });
  }

}
