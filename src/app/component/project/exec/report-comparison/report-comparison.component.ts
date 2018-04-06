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
import {BreadcrumbsService} from 'ng2-breadcrumbs';
import {Log} from '../../../../model/log.model';
import {ElasticsearchService} from '../../../../service/elasticsearch.service';
import {TableService} from '../../../../service/table.service';
import {ITdDataTableColumn} from "@covalent/core";

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
  classesLc: any[];
  comparatorText = '';
  comparedText = '';
  comparisonInProgress: boolean;
  deleteInProgress: boolean;
  execDeleting: string;
  execSelected: number;
  execsData: ITdDataTableColumn[] = [
    {name: 'id', label: 'Id', width: 100},
    {name: 'startdate', label: 'Start date', width: 300},
    {name: 'entries', label: 'Entries', width: 100},
    {name: 'status', label: 'Status'},
    {name: 'DEBUG', label: 'DEBUG', width: 100},
    {name: 'INFO', label: 'INFO', width: 100},
    {name: 'WARNING', label: 'WARNING', width: 100},
    {name: 'ERROR', label: 'ERROR', width: 100},
    {name: 'options', label: 'Options', width: 150}
  ];
  mode: string;
  project: string;
  ready: boolean;
  resultData: any[] = [];
  tabs: any[];
  test: string;
  viewMode: number;

  constructor(private activatedRoute: ActivatedRoute, private breadcrumbs: BreadcrumbsService, private dialog: MatDialog,
              private tableService: TableService, private elasticsearchService: ElasticsearchService) {
    this.comparisonInProgress = false;
  }

  async reloadTabContent() {
    this.tabs = [];
    const response0 = await this.elasticsearchService.getTabsByProjectAsync(this.project);
    for (let i = 0; i < response0.length; i++) {
      const response1 = await this.elasticsearchService.getLogsByProjectAsync(this.project, response0[i].tab);
      const executions = [];
      for (let j = 0; j < response1.length; j++) {
        let icon, classi: any;
        if (response1[j].status.indexOf('SUCCESS') !== -1) {
          icon = 'check-circle';
          classi = 'tc-green-700';
        } else {
          icon = 'error';
          classi = 'tc-red-700';
        }
        executions[j] = {
          'id': response1[j].id,
          'startdate': response1[j].timestamp,
          'entries': response1[j].entries,
          'status': {
            'icon': icon,
            'class': classi,
            'status': response1[j].status
          },
          'DEBUG': response1[j].debug,
          'INFO': response1[j].info,
          'WARNING': response1[j].warning,
          'ERROR': response1[j].error
        }
      }
      this.tabs[i] = {
        'name': response0[i].tab,
        'executions': executions
      };
    }
  }

  private async generateComparisonData() {
    this.updateViewMode(1, this.viewMode);
  }

  private async generateComparison() {
    const comparatorLoggers = await this.elasticsearchService.getLogsByTestAsync(this.test, this.project, true,
      false);
    const comparedLoggers = await this.elasticsearchService.getLogsByTestAsync('' + this.execSelected,
      this.project, true, false);
    this.resultData = [];
    for (let i = 0; i < Math.max(comparatorLoggers.length, comparedLoggers.length); i++) {
      let loggerMessage: string;
      (comparatorLoggers.length > comparedLoggers.length) ? (loggerMessage = comparatorLoggers[i])
        : (loggerMessage = comparedLoggers[i]);
      if (loggerMessage.split(' ').length === 2) {
        const currentLogger = loggerMessage.split(' ')[1];
        const partialLogger = currentLogger.split('.')[currentLogger.split('.').length - 1];
        const comparatorLoggerMethod = await this.elasticsearchService.getLogsByLoggerAsync(partialLogger, this.project,
          this.test, undefined);
        const comparedLoggerMethod = await this.elasticsearchService.getLogsByLoggerAsync(partialLogger, this.project,
          '' + this.execSelected, undefined);
        const methodsData = [];
        for (let j = 0; j < Math.max(comparatorLoggerMethod.length, comparedLoggerMethod.length); j++) {
          this.comparatorText = '';
          this.comparedText = '';
          let methodMessage: string;
          (comparatorLoggerMethod.length > comparedLoggerMethod.length) ? (methodMessage = comparatorLoggerMethod[j])
            : (methodMessage = comparedLoggerMethod[j]);
          const comparatorMethodLogs = await this.elasticsearchService.getLogsByLoggerAsync(partialLogger, this.project,
            this.test, methodMessage.replace('(', '')
            .replace(')', ''));
          const comparedMethodLogs = await this.elasticsearchService.getLogsByLoggerAsync(partialLogger, this.project,
            '' + this.execSelected, methodMessage.replace('(', '')
            .replace(')', ''));

          this.comparatorText = this.generateOutput(comparatorMethodLogs);
          this.comparedText = this.generateOutput(comparedMethodLogs);
          methodsData.push({
            'name': methodMessage,
            'logs': await this.readDiffer()
          });
        }
        this.resultData.push({
          'name': currentLogger,
          'methods': methodsData
        });
      }
      (i === 0) && (this.comparisonInProgress = true);
    }
  }

  private generateOutput(logs: Log[]) {
    let result = '';
    let comparatorDate = new Date();
    if (logs[0] === undefined) {
      return result;
    }
    for (let i = 0; i < logs.length; i++) {
      logs[i].timestamp = logs[i].timestamp.substring(0, 23);
    }
    if (this.mode === '2') {
      comparatorDate = new Date(logs[0].timestamp);
    }
    for (let i = 0; i < logs.length; i++) {
      (this.mode === '1') && (logs[i].timestamp = '');
      (this.mode === '2') && (logs[i].timestamp = ((new Date(logs[i].timestamp)).valueOf()
        - (comparatorDate).valueOf()).toString());
      result += (logs[i].timestamp + ' [' + logs[i].thread + '] ' + logs[i].level + ' ' + logs[i].logger + '' +
        ' ' + logs[i].message) + '\r\n';
    }
    return result;
  }

  async ngOnInit() {
    this.test = this.activatedRoute.snapshot.parent.params['exec'];
    this.project = this.activatedRoute.snapshot.parent.parent.params['project'];
    this.breadcrumbs.store([{label: 'Home', url: '/', params: []},
      {label: this.project, url: '/projects/' + this.project, params: []},
      {label: this.test, url: '/projects/' + this.project + '/' + this.test, params: []},
      {label: 'Reporting', url: '/projects/' + this.project + '/' + this.test + '/report', params: []}]);
    this.classesL = [];
    this.updateViewMode(0, 0);
    this.generateComparisonData();
    this.reloadTabContent();
  }

  openComparisonDialog() {
    this.elasticsearchService.getProjectByName(this.project).subscribe(
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
            this.mode = '' + result.mode;
            this.generateComparison();
          }
        );
      },
      error => console.log(error)
    );
  }

  updateViewMode(comp: number, mode: number) {
    this.viewMode = mode;
    switch (this.viewMode) {
      case 0:
        this.viewRaw(comp, true);
        break;
      case 1:
        this.viewByMethods(comp);
        break;
      case 2:
        this.viewByMethods(comp, true);
        break;
      case 3:
        this.viewRaw(comp, false);
        break;
    }
  }

  private async viewByMethods(mode: number, clean?: boolean) {
    this.ready = false;
    (mode === 0) ? (this.classesL = []) : (this.classesLc = []);
    const loggers = await this.elasticsearchService.getLogsByTestAsync(this.test, this.project, true,
      false);
    for (let i = 0; i < loggers.length; i++) {
      if (loggers[i].split(' ').length === 2) {
        const logger = loggers[i].split(' ')[1];
        const partialLogger = logger.split('.')[logger.split('.').length - 1];
        const methods = await this.elasticsearchService.getLogsByLoggerAsync(partialLogger, this.project, this.test,
          undefined);
        const methodsData = [];
        for (let j = 0; j < methods.length; j++) {
          if (methods[j] !== '') {
            const cleanMethod = methods[j].replace('(', '').replace(')', '');
            methodsData.push({
              'name': methods[j],
              'logs': await this.elasticsearchService.getLogsByLoggerAsync(partialLogger, this.project, this.test,
                cleanMethod)
            });
          }
        }
        (mode === 0) ? (this.classesL.push({'name': loggers[i].split(' ')[1], 'methods': methodsData}))
          : (this.classesLc.push({'name': loggers[i].split(' ')[1], 'methods': methodsData}));
      }
    }
    (clean) && (this.cleanSuccess());
    this.ready = true;
  }

  private async viewRaw(mode: number, maven: boolean) {
    this.ready = false;
    (mode === 0) ? (this.classesL = []) : (this.classesLc = []);
    const logs = await this.elasticsearchService.getLogsByTestAsync(this.test, this.project, false, maven);
    for (let i = 0; i < logs.length; i++) {
      (mode === 0) ? (this.classesL.push({'log': logs[i].log})) : (this.classesLc.push({'log': logs[i].log}));
    }
    this.ready = true;
  }

  private cleanSuccess() {
    console.log(this.classesL);
  }

  private async readDiffer() {
    const response = await this.elasticsearchService.postDiff(this.comparatorText, this.comparedText);
    return this.tableService.generateTable(response);
  }
}
