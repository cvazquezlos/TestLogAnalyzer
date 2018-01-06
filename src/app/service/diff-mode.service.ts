import {Injectable} from '@angular/core';

import {Log} from '../model/log.model';

@Injectable()
export class DiffModeService {

  timeDiff(data: any[], acum: string) {
    acum = '';
    const dateOrigin = new Date(data[0].timestamp);
    data.forEach(tDiffLog => {
      tDiffLog.timestamp = ((new Date(tDiffLog.timestamp)).valueOf() - (dateOrigin).valueOf()).toString();
      acum += this.generateOutput(tDiffLog);
    });
  }

  noTimestampDiff(data: any[]) {
    let result = '';
    data.forEach(noTLog => {
      noTLog.timestamp = '';
      result += this.generateOutput(noTLog);
    });
    return result;
  }

  private generateOutput(log: Log) {
    return (log.timestamp + ' [' + log.thread_name + '] ' + log.level + ' ' + log.logger_name + '' +
      ' ' + log.formatted_message) + '\n';
  }

}
