import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import {TdMediaService} from '@covalent/core';

import {Log} from '../../model/source.model';
import {ElasticsearchService} from '../../service/elasticsearch.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})

export class ComparisonComponent {

  @ViewChild('process') process: ElementRef;

  active = false;
  comparatorText: string;
  comparedText: string;
  config = {
    lineNumbers: true,
    theme: 'twilight',
    readOnly: 'nocursor',
    lineWrapping : true,
    mode: 'xml' };
  execsComparator: any[] = [];
  execsCompared: any[] = [];
  execsNumber = 0;
  methods: any[] = [];
  results = [];

  constructor(private elasticsearchService: ElasticsearchService, public media: TdMediaService) {
    this.initInfo('1');
    this.comparatorText = '';
    this.comparedText = '';
  }

  comparator(exec: any) {
    if (!this.isSelectedAnyElement(this.execsCompared)) {
      this.addExecs(1, exec.id, exec.method);
      this.addExecs(2, exec.id, exec.method);
      exec.class = 'active';
      console.log(exec.id);
      this.loadInfo(exec.id, 0, exec.method);
      this.deleteExec(this.execsCompared, exec);
    } else {
      this.loadInfo(exec.id, 0, exec.method);
      exec.class = 'active';
      this.deleteExec(this.execsCompared, exec);
    }
  }

  compared(exec: any) {
    if (!this.isSelectedAnyElement(this.execsComparator)) {
      this.addExecs(1, exec.id, exec.method);
      this.addExecs(2, exec.id, exec.method);
      exec.class = 'active';
      console.log(exec.id);
      this.loadInfo(exec.id, 1, exec.method);
      this.deleteExec(this.execsComparator, exec);
    } else {
      this.loadInfo(exec.id, 1, exec.method);
      exec.class = 'active';
      this.deleteExec(this.execsComparator, exec);
    }
  }

  generateComparison() {
    const comparisonResult = this.process.nativeElement.innerHTML.toString();
    const lines = comparisonResult.split('<br>');
    let resultComparator = [];
    let comparatorData;
    let comparatorAct = false;
    let resultCompared = [];
    let comparedData;
    let comparedAct = false;
    for (let i = 0; i < lines.length; i++) {
      comparatorAct = false;
      comparatorData = lines[i];
      let uselessData;
      while (comparatorData.indexOf('<ins>') > -1) {
        uselessData = this.cleanString(comparatorData, '<ins>', '</ins>');
        comparatorData = comparatorData.replace('<ins>' + uselessData + '</ins>', '');
        comparatorAct = true;
      }
      let classC = 'normal';
      if (comparatorAct) {
        classC = 'delC'
      }
      resultComparator = resultComparator.concat({
        'content': comparatorData.replace('<div>', '').replace('</div>', ''),
        'class': classC
      });
      comparedAct = false;
      comparedData = lines[i];
      while (comparedData.indexOf('<del>') > -1) {
        uselessData = this.cleanString(comparedData, '<del>', '</del>');
        comparedData = comparedData.replace('<del>' + uselessData + '</del>', '');
        comparedAct = true;
      }
      let classc = 'normal';
      if (comparedAct) {
        classc = 'insC'
      }
      resultCompared = resultCompared.concat({
        'content': comparedData.replace('<div>', '').replace('</div>', ''),
        'class': classc
      });
    }
    this.results = [];
    for (let i = 0; i < comparatorData.length; i++) {
      this.results = this.results.concat({
        'index': (i + 1).toString() + '.',
        'com_p': resultComparator[i],
        'comp': resultCompared[i]
      });
    }
  }

  methodSelected(method: any) {
    this.deselect();
    console.log('Method selected: ' + method.title);
    console.log('Loading executions...');
    this.execsComparator = [];
    this.execsCompared = [];
    this.countExecs(0, method.title.replace('(', '').replace(')', ''));
    method.class = 'meth-active';
    this.active = true;
  }

  private addExecs(type: number, exec: number, method: string) {
    let classN = 'execs';
    switch (type) {
      case 1:
        this.execsComparator = [];
        for (let i = 0; i < this.execsNumber; i++) {
          if (i + 1 === exec) {
            classN = 'active';
          }
          this.execsComparator = this.execsComparator.concat({
            'id': i + 1,
            'class': classN,
            'method': method
          });
          classN = 'execs';
        }
        break;
      case 2:
        this.execsCompared = [];
        for (let i = 0; i < this.execsNumber; i++) {
          if (i + 1 === exec) {
            classN = 'active';
          }
          this.execsCompared = this.execsCompared.concat({
            'id': i + 1,
            'class': classN,
            'method': method
          });
          classN = 'execs';
        }
        break;
    }
  }

  private countExecs(index: number, method) {
    this.elasticsearchService.count(2, (index + 1).toString()).subscribe(
      count => {
        if (count !== 0) {
          this.execsComparator = this.execsComparator.concat({
            'id': index + 1,
            'class': 'execs',
            'method': method,
          });
          this.execsCompared = this.execsCompared.concat({
            'id': index + 1,
            'class': 'execs',
            'method': method,
          });
          this.countExecs(index + 1, method);
        } else {
          this.execsNumber = index;
          console.log('Success. Avaible executions: ' + this.execsNumber);
        }
      },
      error => console.log(error)
    );
  }

  private deleteExec(execs: any[], exec: any) {
    let index = 0;
    for (const execution of execs) {
      if (execution.id === exec.id) {
        execs.splice(index, 1);
        break;
      }
      index += 1;
    }
  }

  private cleanString(line: string, init: string, end: string) {
    if (line.indexOf(init) !== -1 && line.indexOf(end) !== -1) {
      const SP = line.indexOf(init) + init.length;
      const string1 = line.substr(0, SP);
      const string2 = line.substr(SP);
      const TP = string1.length + string2.indexOf(end);
      console.log(line.substring(SP, TP));
      return line.substring(SP, TP);
    }
  }

  private initInfo(value: string) {
    this.elasticsearchService.get(1, 1000, '1', false).subscribe(
      data1 => {
        console.log('Loading test names...');
        this.methods = [];
        let logs: Log[] = [];
        logs = logs.concat(data1);
        for (const log of logs) {
          const args = log.formatted_message.split(' ');
          if ((this.methods.indexOf(args[1]) === -1) && (args[2] === 'method')) {
            this.methods = this.methods.concat({
              'icon': 'event_note',
              'title': args[1],
              'class': 'no-active'
            })
          }
        }
        console.log('Test names added.');
      },
      error => console.log(error)
    );
  }

  private isSelectedAnyElement(execs: any[]) {
    for (const exec of execs) {
      if (exec.class === 'active') {
        return true;
      }
    }
    return false;
  }

  private loadInfo(exec: string, type: number, method: string) {
    this.elasticsearchService.get(2, 1000, exec, false, method).subscribe(
      data => {
        let aux = [];
        aux = aux.concat(data);
        switch (type) {
          case 0:
            this.comparatorText = '';
            for (const dat of aux) {
              this.comparatorText += dat.entire_log + '\n';
            }
            break;
          case 1:
            this.comparedText = '';
            for (const dat of aux) {
              this.comparedText += dat.entire_log + '\n';
            }
            break;
        }
      },
      error => console.log(error)
    );
  }

  private deselect() {
    for (const method of this.methods) {
      method.class = 'no-active';
    }
  }
}
