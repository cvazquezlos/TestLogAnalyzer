import {Source} from './source.model';

export interface Log {
  _index: any;
  _type: any;
  _id: any;
  _score: any;
  _source: Source;
}
