import {Injectable} from '@angular/core';

@Injectable()
export class ExecsStatusService {
  posCSelected: number;
  poscSelected: number;
  comparatorOptions: boolean[];
  comparedOptions: boolean[];

  initialize(execsNumber: number) {
    this.comparatorOptions = [];
    this.comparedOptions = [];
    for (let i = 0; i < execsNumber; i++) {
      this.comparatorOptions = this.comparatorOptions.concat(true);
      this.comparedOptions = this.comparedOptions.concat(true);
    }
  }

  comparatorClic(selected: number, method: string) {
    let result: any;
    if (this.comparatorOptions[selected - 1]) {
      this.comparatorOptions.forEach(elem => elem = true);
      this.comparatorOptions[selected - 1] = false;
      this.posCSelected = selected;
      this.comparedOptions[selected - 1] = false;
    } else {
      this.comparatorOptions.forEach(elem => elem = true);
      this.comparedOptions[selected - 1] = true;
      this.posCSelected = -1;
    }
    result = {
      'comparator': this.exportResults(method, 0),
      'compared': this.exportResults(method, 1)
    };
    return result;
  }

  comparedClic(selected: number, method: string) {
    let result: any;
    if (this.comparedOptions[selected - 1]) {
      this.comparedOptions.forEach(elem => elem = true);
      this.comparedOptions[selected - 1] = false;
      this.poscSelected = selected;
      this.comparatorOptions[selected - 1] = false;
    } else {
      this.comparedOptions.forEach(elem => elem = true);
      this.comparatorOptions[selected - 1] = true;
      this.poscSelected = -1;
    }
    result = {
      'comparator': this.exportResults(method, 0),
      'compared': this.exportResults(method, 1)
    };
    return result;
  }

  exportResults(method: string, code: number) {
    let variable: boolean[];
    let pos: number;
    (code === 0) ? (variable = this.comparatorOptions) : (variable = this.comparedOptions);
    (code === 0) ? (pos = this.posCSelected) : (pos = this.poscSelected);
    let result: any[];
    result = [];
    let classs = '';
    for (let i = 0; i < variable.length; i++) {
      (variable[i]) ? (classs = 'execs') : ((i === (pos - 1) ? (classs = 'active') : (classs = 'hide')));
      result = result.concat({
        'id': i + 1,
        'class': classs,
        'method': method
      })
    }
    return result;
  }
}
