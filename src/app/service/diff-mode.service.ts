import {Injectable} from '@angular/core';

@Injectable()
export class DiffModeService {

  timeDiff(data: any[]) {
    let result = '';
    const dateOrigin = new Date(data[0].timestamp);
    data.forEach(log => {
      log.timestamp = ((new Date(log.timestamp)).valueOf() - (dateOrigin).valueOf()).toString();
      result += (log.timestamp + ' [' + log.thread_name + '] ' + log.level + ' ' + log.logger_name + '' +
        ' ' + log.formatted_message) + '\n'
    });
    return result;
  }

  noTimestampDiff(data: any[]) {
    let result = '';
    data.forEach(log => {
      log.timestamp = '';
      result += (log.timestamp + ' [' + log.thread_name + '] ' + log.level + ' ' + log.logger_name + '' +
        ' ' + log.formatted_message) + '\n'
    });
    return result;
  }

}
