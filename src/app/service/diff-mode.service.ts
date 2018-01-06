import {Injectable} from '@angular/core';

@Injectable()
export class DiffModeService {

  timeDiff(data: any[]) {
    const dateOrigin = new Date(data[0].timestamp);
    data.forEach(log => log.timestamp = ((dateOrigin).valueOf() - (new Date(log.timestamp)).valueOf()).toString());
  }

  noTimestampDiff() {

  }

}
