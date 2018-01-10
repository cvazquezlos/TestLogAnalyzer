import {Injectable} from '@angular/core';

@Injectable()
export class ExecsStatusService {
  posCSelected: number;
  poscSelected: number;
  comparatorOptions: boolean[];
  comparedOptions: boolean[];

  initialize(execsNumber: number, method: string) {
    let result: any;
    this.posCSelected = -1;
    this.poscSelected = -1;
    this.comparatorOptions = [];
    this.comparedOptions = [];
    for (let i = 0; i < execsNumber; i++) {
      this.comparatorOptions = this.comparatorOptions.concat(true);
      this.comparedOptions = this.comparedOptions.concat(true);
    }
    result = {
      'comparator': this.exportResults(method, this.posCSelected, this.comparatorOptions),
      'compared': this.exportResults(method, this.poscSelected, this.comparedOptions)
    };
    return result;
  }

  comparatorClic(selected: number, method: string) {
    let result: any;
    if (this.comparatorOptions[selected - 1] === true) {
      this.reset(0);
      this.reset(1);
      (this.poscSelected !== -1) && (this.comparedOptions[this.poscSelected] = false);
      (this.poscSelected !== -1) && (this.comparatorOptions[this.poscSelected] = false);
      this.posCSelected = selected - 1;
      this.comparatorOptions[this.posCSelected] = false;
      this.comparedOptions[this.posCSelected] = false;
    } else {
      this.comparatorOptions[this.posCSelected] = true;
      this.comparedOptions[this.posCSelected] = true;
      this.posCSelected = -1;
    }
    result = {
      'comparator': this.exportResults(method, this.posCSelected, this.comparatorOptions),
      'compared': this.exportResults(method, this.poscSelected, this.comparedOptions)
    };
    return result;
  }

  comparedClic(selected: number, method: string) {
    let result: any;
    if (this.comparedOptions[selected - 1] === true) {
      this.reset(1);
      this.reset(0);
      (this.posCSelected !== -1) && (this.comparedOptions[this.posCSelected] = false);
      (this.posCSelected !== -1) && (this.comparatorOptions[this.posCSelected] = false);
      this.poscSelected = selected - 1;
      this.comparatorOptions[this.poscSelected] = false;
      this.comparedOptions[this.poscSelected] = false;
    } else {
      this.comparatorOptions[this.poscSelected] = true;
      this.comparedOptions[this.poscSelected] = true;
      this.poscSelected = -1;
    }
    result = {
      'comparator': this.exportResults(method, this.posCSelected, this.comparatorOptions),
      'compared': this.exportResults(method, this.poscSelected, this.comparedOptions)
    };
    return result;
  }

  exportResults(method: string, pos: number, options: boolean[]) {
    let result: any[] = [];
    let classs = '';
    for (let i = 0; i < options.length; i++) {
      (options[i] === true) ? (classs = 'execs') : ((i === pos) ? (classs = 'active') : (classs = 'hide'));
      result = result.concat({
        'id': i + 1,
        'class': classs,
        'method': method
      })
    }
    return result;
  }

  private reset(code: number) {
    let variable: boolean[];
    (code === 0) ? (variable = this.comparatorOptions) : (variable = this.comparedOptions);
    for (let i = 0; i < variable.length; i++) {
      variable[i] = true;
    }
    (code === 0) ? (this.comparatorOptions = variable) : (this.comparedOptions = variable);
  }
}
