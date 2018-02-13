import {HttpClient} from '@angular/common/http';
import {
  Component, ElementRef,
  Inject, OnInit,
  ViewChild
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {DiffMatchPatchService} from 'ng-diff-match-patch/dist/diffMatchPatch.service';
import {BreadcrumbsService} from 'ng2-breadcrumbs';
import {Project} from '../../../../model/project.model';
import {Log} from '../../../../model/log.model';
import {DiffService} from '../../../../service/diff.service';

@Component({
  selector: 'app-report-comparison-settings',
  templateUrl: './comparison-settings/comparison-settings.component.html',
  styleUrls: ['./comparison-settings/comparison-settings.component.css']
})

export class ComparisonSettingsComponent {

  constructor(public dialogRef: MatDialogRef<ComparisonSettingsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-report-comparison',
  templateUrl: './report-comparison.component.html',
  styleUrls: ['./report-comparison.component.css']
})

export class ReportComparisonComponent implements OnInit {

  @ViewChild('process') process: ElementRef;

  classesL: any[];
  comparatorText = '';
  comparedText = '';
  comparisonInProcess: boolean;
  execSelected: number;
  mode: number;
  processing: any;
  project: string;
  ready: boolean;
  resultData: any[] = [];
  test: string;

  constructor(private activatedRoute: ActivatedRoute, private breadcrumbs: BreadcrumbsService, private http: HttpClient,
              private dialog: MatDialog, private diffService: DiffService, private diffMPService: DiffMatchPatchService) {
    this.comparisonInProcess = false;
  }

  private async generateComparison() {
    const comparatorLoggers = await this.getLoggers(this.test);
    const comparedLoggers = await this.getLoggers('' + this.execSelected);
    console.log(this.test);
    console.log(this.execSelected);
    this.resultData = [];
    for (let i = 0; i < Math.max(comparatorLoggers.length, comparedLoggers.length); i++) {
      let loggerMessage: string;
      (comparatorLoggers.length > comparedLoggers.length) ? (loggerMessage = comparatorLoggers[i])
        : (loggerMessage = comparedLoggers[i]);
      console.log(loggerMessage);
      if (loggerMessage.split(' ').length === 2) {
        const currentLogger = loggerMessage.split(' ')[1];
        const partialLogger = currentLogger.split('.')[currentLogger.split('.').length - 1];
        const comparatorLoggerMethod = await this.getMethodsByPartialLogger(this.test, partialLogger);
        const comparedLoggerMethod = await this.getMethodsByPartialLogger('' + this.execSelected, partialLogger);
        const methodsData = [];
        for (let j = 0; j < Math.max(comparatorLoggerMethod.length, comparedLoggerMethod.length); j++) {
          this.comparatorText = '';
          this.comparedText = '';
          let methodMessage: string;
          (comparatorLoggerMethod.length > comparedLoggerMethod.length) ? (methodMessage = comparatorLoggerMethod[j])
            : (methodMessage = comparedLoggerMethod[j]);
          console.log(methodMessage);
          const comparatorMethodLogs = await this.getLogs(this.test, partialLogger, methodMessage.replace('(', '')
            .replace(')', ''));
          const comparedMethodLogs = await this.getLogs('' + this.execSelected, partialLogger, methodMessage
            .replace('(', '').replace(')', ''));
          for (let k = 0; k < comparatorMethodLogs.length; k++) {
            this.comparatorText += this.generateOutput(comparatorMethodLogs[k]);
          }
          for (let k = 0; k < comparedMethodLogs.length; k++) {
            this.comparedText += this.generateOutput(comparedMethodLogs[k]);
          }
          methodsData.push({
            'name': methodMessage,
            'logs': this.readDiffer()
          });
        }
        this.resultData.push({
          'name': currentLogger,
          'methods': methodsData
        });
      }
    }
    this.comparisonInProcess = true;
  }

  private generateOutput(log: Log) {
    return (log.timestamp + ' [' + log.thread + '] ' + log.level + ' ' + log.logger + '' +
      ' ' + log.message) + '\n';
  }

  async ngOnInit() {
    this.test = this.activatedRoute.snapshot.parent.params['exec'];
    this.project = this.activatedRoute.snapshot.parent.parent.params['project'];
    this.breadcrumbs.store([{label: 'Home', url: '/', params: []},
      {label: this.project, url: '/projects/' + this.project, params: []},
      {label: this.test, url: '/projects/' + this.project + '/' + this.test, params: []},
      {label: 'Reporting', url: '/projects/' + this.project + '/' + this.test + '/report', params: []}]);
    this.ready = false;
    this.classesL = [];
    const loggers = await this.getLoggers(this.test);
    for (let i = 0; i < loggers.length; i++) {
      if (loggers[i].split(' ').length === 2) {
        const logger = loggers[i].split(' ')[1];
        const partialLogger = logger.split('.')[logger.split('.').length - 1];
        const methods = await this.getMethodsByPartialLogger(this.test, partialLogger);
        const methodsData = [];
        for (let j = 0; j < methods.length; j++) {
          methodsData.push({
            'name': methods[j],
            'logs': await this.getLogs(this.test, partialLogger, methods[j].replace('(', '').replace(')', ''))
          });
        }
        this.classesL.push({
          'name': loggers[i],
          'methods': methodsData
        });
      }
    }
    this.ready = true;
  }

  openComparisonDialog() {
    this.http.get<Project>('http://localhost:8443/projects/name/' + this.project).subscribe(
      response => {
        const avaibleExecs = [];
        for (let i = 0; i < response.num_execs; i++) {
          if ((+this.test !== (i + 1)) && (!avaibleExecs.includes(i + 1))) {
            avaibleExecs.push(i + 1);
          }
        }
        const dialogRef = this.dialog.open(ComparisonSettingsComponent, {
          data: {execSelected: this.execSelected, mode: this.mode, avaible: avaibleExecs},
          height: '310px',
          width: '600px',
        });
        dialogRef.afterClosed().subscribe(
          result => {
            this.execSelected = result.execSelected;
            this.mode = result.mode;
            this.generateComparison();
          }
        );
      }
    );
  }

  private async getLoggers(test: string) {
    try {
      const response = await this.http.get<string[]>('http://localhost:8443/logs/test/' + test + '?project=' + this.project
        + '&classes=true').toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  private async getLogs(test: string, partialLogger: string, method: string) {
    try {
      const response = await this.http.get<Log[]>('http://localhost:8443/logs/logger/' + partialLogger + '?project=' + this.project
        + '&test=' + test + '&method=' + method).toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  private async getMethodsByPartialLogger(test: string, partialLogger: string) {
    try {
      const response = await this.http.get<string[]>('http://localhost:8443/logs/logger/' + partialLogger + '?project=' + this.project
        + '&test=' + test).toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  private readDiffer() {
    let code = 0;
    if ((this.comparatorText.split('\n').length) >= (this.comparedText.split('\n').length)) {
      code = 0;
    } else {
      code = 1;
    }
    const diff = this.diffService.createHTML(this.diffMPService.getDiff(this.comparatorText, this.comparedText));
    return this.diffService.generateComparison(diff, code);
  }

}
