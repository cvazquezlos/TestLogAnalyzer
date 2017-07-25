import {Log} from './log.model';

export interface Response {
  total: any;
  max_score: any;
  hits: Log[];
}
