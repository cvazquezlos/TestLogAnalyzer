import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {ITdDataTableColumn} from '@covalent/core';
import {BreadcrumbsService} from 'ng2-breadcrumbs';
import {Log} from '../../../../model/log.model';
import {ElasticsearchService} from '../../../../service/elasticsearch.service';
import {TableService} from '../../../../service/table.service';
import {ClassC} from '../../../../model/classc.model';
import {TestC} from '../../../../model/testc.model';

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
  comparisonInProgress = false;
  comparisonButtonsClasses = ['primary', 'primary', 'primary'];
  comparisonMode: number;
  deleteInProgress: boolean;
  execDeleting: string;
  execsData: ITdDataTableColumn[] = [
    {name: 'id', label: 'Id', width: 60},
    {name: 'startdate', label: 'Start date', width: 240},
    {name: 'entries', label: 'Entries', width: 100},
    {name: 'status', label: 'Status'},
    {name: 'errors', label: 'ERRORS', width: 100},
    {name: 'failures', label: 'FAILURES', width: 100},
    {name: 'flakes', label: 'FLAKES', width: 100},
    {name: 'skipped', label: 'SKIPPED', width: 100},
    {name: 'tests', label: 'tests', width: 70},
    {name: 'test', label: 'test id', width: 70},
    {name: 'time_elapsed', label: 'Time elapsed'},
    {name: 'options', label: 'Options', width: 150}
  ];
  showExecSelection: boolean;
  showSelectionMessage = false;
  project: string;
  selected: any[] = [];
  status = 'BUILD FAILURE';
  ready: boolean;
  resultData: any[] = [];
  tabs: any[];
  test: string;
  viewButtonsClasses = ['accent', 'primary', 'primary', 'primary'];
  viewMode: number;

  constructor(private activatedRoute: ActivatedRoute, private breadcrumbs: BreadcrumbsService, private dialog: MatDialog,
              private tableService: TableService, private elasticsearchService: ElasticsearchService) {
    this.comparisonInProgress = false;
    this.showExecSelection = false;
  }

  private generateOutput(logs: Log[]) {
    let result = '';
    let comparatorDate = new Date();
    if (logs[0] === undefined) {
      return result;
    }
    for (let i = 0; i < logs.length; i++) {
      (logs[i].timestamp.length > 2) ? (logs[i].timestamp = logs[i].timestamp.substring(0, 23)) : (logs[i].timestamp = '');
      (logs[i].thread.length > 2) ? ((logs[i].thread.indexOf('[') === -1) && (logs[i].thread = ' ['
        + logs[i].thread + '] ')) : (logs[i].thread = '');
      (logs[i].level.length > 2) ? (logs[i].level = logs[i].level) : (logs[i].level = '');
      (logs[i].logger.length > 2) ? (logs[i].logger = logs[i].logger) : (logs[i].logger = '');
    }
    if ((this.comparisonMode + '') === '2') {
      comparatorDate = new Date(this.findValidTimestamp(logs));
    }
    for (let i = 0; i < logs.length; i++) {
      ((this.comparisonMode + '') === '1') && (logs[i].timestamp = '');
      if (((this.comparisonMode + '') === '2') && (logs[i].timestamp.length > 2)) {
        logs[i].timestamp = ((new Date(logs[i].timestamp)).valueOf()
          - (comparatorDate).valueOf()).toString();
      }
      result += (logs[i].timestamp + logs[i].thread + logs[i].level + ' ' + logs[i].logger + '' +
        ' ' + logs[i].message) + '\r\n';
    }
    return result;
  }

  async ngOnInit() {
    this.test = this.activatedRoute.snapshot.parent.params['exec'];
    this.project = this.activatedRoute.snapshot.parent.parent.params['project'];
    this.breadcrumbs.store([{label: 'Home', url: '/', params: []},
      {label: this.project, url: '/projects/' + this.project, params: []},
      {label: this.test, url: '/projects/' + this.project + '/' + this.test, params: []}]);
    this.classesL = [];
    this.classesLc = [];
    this.updateViewMode(0, 0);
    this.reloadTabContent();
    const result = await this.elasticsearchService.getExecutionByTestAsync(this.test);
    this.status = result.status;
  }

  async reloadTabContent() {
    this.tabs = [];
    const response0 = await this.elasticsearchService.getTabsByProjectAsync(this.project);
    for (let i = 0; i < response0.length; i++) {
      const response1 = await this.elasticsearchService.getExecutionsByProjectAndTabAsync(this.project, response0[i].tab);
      const executions = [];
      for (let j = 0; j < response1.length; j++) {
        let icon, classi: any;
        if (response1[j].status.indexOf('SUCCESS') !== -1) {
          icon = 'check_circle';
          classi = 'tc-green-700';
        } else {
          icon = 'error';
          classi = 'tc-red-700';
        }
        if (this.test !== (response1[j].test + '')) {
          executions.push({
            'id': response1[j].id,
            'startdate': response1[j].start_date,
            'entries': response1[j].entries,
            'status': {
              'icon': icon,
              'class': classi,
              'status': response1[j].status
            },
            'errors': response1[j].errors,
            'failures': response1[j].failures,
            'flakes': response1[j].flakes,
            'skipped': response1[j].skipped,
            'tests': response1[j].tests,
            'test': response1[j].test,
            'time_elapsed': response1[j].time_elapsed + ' seconds'
          });
        } else {
          this.selected[0] = executions[executions.length - 1];
        }
      }
      this.tabs[i] = {
        'name': response0[i].tab,
        'executions': executions
      }
    }
  }

  async updateComparisonMode(mode: number) {
    this.comparisonMode = mode;
    if (this.selected[0] === undefined) {
      this.showSelectionMessage = true;
      this.showExecSelection = true;
    } else {
      switch (this.viewMode) {
        case 0:
          await this.generateRawComparison();
          break;
        case 1:
          await this.generateMethodsComparison();
          break;
        case 2:
          await this.generateMethodsComparison();
          break;
        case 3:
          await this.generateRawComparison();
          break;
      }
      this.resetComparisonButtonsClasses();
    }
  }

  async updateViewMode(comp: number, mode: number) {
    this.viewMode = mode;
    this.resetViewButtonsClasses();
    switch (this.viewMode) {
      case 0:
        await this.viewRaw(comp, true);
        break;
      case 1:
        await this.viewByMethods(comp, false);
        break;
      case 2:
        await this.viewByMethods(comp, true);
        break;
      case 3:
        await this.viewRaw(comp, false);
        break;
    }
    if (this.comparisonInProgress) {
      this.updateComparisonMode(this.comparisonMode);
    }
  }

  disableComparison() {
    this.comparisonInProgress = false;
    this.resetComparisonButtonsClasses();
  }

  selectEvent(event: any) {
    this.selected[0] = event.row;
    if (this.comparisonInProgress) {
      this.updateComparisonMode(this.comparisonMode);
    }
    if (this.showSelectionMessage) {
      this.showSelectionMessage = false;
      this.updateComparisonMode(this.comparisonMode);
      this.showExecSelection = false;
    }
  }

  private async cleanContent(mode: number) {
    let auxC = [];
    (mode === 0) ? (auxC = this.classesL) : (auxC = this.classesLc);
    (mode === 0) ? (this.classesL = []) : (this.classesLc = []);
    const execution = await this.elasticsearchService.getExecutionByTestAsync((mode === 0) ? (this.test)
      : (this.selected[0].test + ''));
    const testcases = [];
    for (let i = 0; i < execution.testcases.length; i++) {
      const name = execution.testcases[i].name;
      testcases.push(name.substring(0, name.indexOf('(')) + ',' + (execution.testcases[i].failureDetail !== null));
    }
    let aux;
    for (let i = 0; i < auxC.length; i++) {
      aux = [];
      const failedMethods = [];
      for (let j = 0; j < auxC[i].methods.length; j++) {
        if (!this.index(testcases, auxC[i].methods[j].name)) {
          // Aditional functionality
        } else {
          failedMethods.push(auxC[i].methods[j]);
        }
      }
      if (failedMethods.length > 0) {
        aux.push({
          'name': auxC[i].name,
          'methods': failedMethods
        });
      }
    }
    (mode === 0) ? (this.classesL = aux) : (this.classesLc = aux);
  }

  private async generateMethodsComparison() {
    this.comparisonInProgress = false;
    const comparisonDictionary: { [name: string]: ClassC } = {};
    await this.updateViewMode(0, this.viewMode);
    await this.updateViewMode(1, this.viewMode);
    for (let i = 0; i < this.classesL.length; i++) {
      if (comparisonDictionary[this.classesL[i].name] === undefined) {
        const methods = [];
        for (let j = 0; j < this.classesL[i].methods.length; j++) {
         methods.push({
           'name': this.classesL[i].methods[j].name,
           'comparator': this.generateOutput(this.classesL[i].methods[j].logs),
           'compared': ''
         });
        }
        comparisonDictionary[this.classesL[i].name] = {
          'name': this.classesL[i].name,
          'tests': methods
        }
      }
    }
    for (let i = 0; i < this.classesLc.length; i++)  {
      if (comparisonDictionary[this.classesLc[i].name] !== undefined) {
        const targetClass = comparisonDictionary[this.classesLc[i].name];
        for (let j = 0; j < this.classesLc[i].methods.length; j++) {
          const position = this.containsTest(targetClass.tests, this.classesLc[i].methods[j]);
          if (position !== -1) {
            targetClass.tests[position].compared = this.generateOutput(this.classesLc[i].methods[j].logs);
          } else {
            targetClass.tests.push({
              'name': this.classesLc[i].methods[j].name,
              'comparator': '',
              'compared': this.generateOutput(this.classesLc[i].methods[j].logs)
            });
          }
        }
        comparisonDictionary[this.classesLc[i].name] = targetClass;
      } else {
        const methodsC = [];
        for (let j = 0; j < this.classesLc[i].methods.length; j++) {
          methodsC.push({
            'methodsC': this.classesLc[i].methods[j].name,
            'comparator': '',
            'compared': this.generateOutput(this.classesLc[i].methods[j].logs)
          });
        }
        comparisonDictionary[this.classesLc[i].name] = {
          'name': this.classesLc[i].name,
          'tests': methodsC
        }
      }
    }
    this.resultData = [];
    for (const classC in comparisonDictionary) {
      if (comparisonDictionary.hasOwnProperty(classC)) {
        const value = comparisonDictionary[classC];
        const methodsData = [];
        this.comparatorText = '';
        this.comparedText = '';
        for (let i = 0; i < value.tests.length; i++) {
          this.comparatorText = value.tests[i].comparator;
          this.comparedText = value.tests[i].compared;
          methodsData.push({
            'name': value.tests[i].name,
            'logs': await this.readDiffer()
          });
        }
        this.resultData.push({
          'name': value.name,
          'methods': methodsData
        });
      }
    }
    this.comparisonInProgress = true;
  }

  private async generateRawComparison() {
    this.comparisonInProgress = false;
    await this.updateViewMode(0, this.viewMode);
    await this.updateViewMode(1, this.viewMode);
    this.resultData = [];
    this.comparatorText = '';
    this.comparatorText = this.generateOutput(this.classesL);
    this.comparedText = '';
    this.comparedText = this.generateOutput(this.classesLc);
    this.resultData[0] = {
      'logs': await this.readDiffer()
    };
    this.comparisonInProgress = true;
  }

  private async readDiffer() {
    const response = await this.elasticsearchService.postDiff(this.comparatorText, this.comparedText);
    return this.tableService.generateTable(response);
  }

  private async viewByMethods(mode: number, clean?: boolean) {
    this.ready = false;
    (mode === 0) ? (this.classesL = []) : (this.classesLc = []);
    const loggers = await this.elasticsearchService.getLogsByTestAsync((mode === 0) ? (this.test)
      : (this.selected[0].test), this.project, true, false);
    for (let i = 0; i < loggers.length; i++) {
      if (loggers[i].split(' ').length === 2) {
        const logger = loggers[i].split(' ')[1];
        const partialLogger = logger.split('.')[logger.split('.').length - 1];
        const methods = await this.elasticsearchService.getLogsByLoggerAsync(partialLogger, this.project, (mode === 0)
          ? (this.test) : (this.selected[0].test), undefined);
        const methodsData = [];
        for (let j = 0; j < methods.length; j++) {
          if (methods[j] !== '') {
            const cleanMethod = methods[j].replace('(', '').replace(')', '');
            methodsData.push({
              'name': methods[j],
              'logs': await this.elasticsearchService.getLogsByLoggerAsync(partialLogger, this.project, (mode === 0)
                ? (this.test) : (this.selected[0].test), cleanMethod)
            });
          }
        }
        (mode === 0) ? (this.classesL.push({'name': loggers[i].split(' ')[1], 'methods': methodsData}))
          : (this.classesLc.push({'name': loggers[i].split(' ')[1], 'methods': methodsData}));
      }
    }
    (clean) && (await this.cleanContent(mode));
    this.ready = true;
  }

  private async viewRaw(mode: number, maven: boolean) {
    this.ready = false;
    (mode === 0) ? (this.classesL = []) : (this.classesLc = []);
    const logs = await this.elasticsearchService.getLogsByTestAsync((mode === 0) ? (this.test)
      : (this.selected[0].test), this.project, false, maven);
    for (let i = 0; i < logs.length; i++) {
      (mode === 0) ? (this.classesL.push(logs[i])) : (this.classesLc.push(logs[i]));
    }
    this.ready = true;
  }

  private containsTest(tests: TestC[], test: TestC): number {
    for (let i = 0; i < tests.length; i++) {
      if (tests[i].name === test.name) {
        return i;
      }
    }
    return -1;
  }

  private findValidTimestamp(logs: Log[]): string {
    for (let i = 0; i < logs.length; i++) {
      if (logs[i].timestamp.length > 2) {
        return logs[i].timestamp;
      }
    }
    return '';
  }

  private index(testcases: string[], method: string): boolean {
    for (let i = 0; i < testcases.length; i++) {
      const elements = testcases[i].split(',');
      if ((elements[0] === method) && (elements[1]) === 'true') {
        return true;
      }
    }
    return false;
  }

  private resetComparisonButtonsClasses() {
    for (let i = 0; i < this.comparisonButtonsClasses.length; i++) {
      this.comparisonButtonsClasses[i] = 'primary';
    }
    if (this.comparisonInProgress) {
      this.comparisonButtonsClasses[this.comparisonMode] = 'accent';
    }
  }

  private resetViewButtonsClasses() {
    for (let i = 0; i < this.viewButtonsClasses.length; i++) {
      this.viewButtonsClasses[i] = 'primary';
    }
    this.viewButtonsClasses[this.viewMode] = 'accent';
  }
}
