import {TestCase} from './test-case.model';

export interface Execution {
  id: number;
  entries: number;
  errors: number;
  failures: number;
  flakes: number;
  test_id: string;
  project: string;
  skipped: number;
  start_date: string;
  status: string;
  tests: number;
  test: string;
  testcases: TestCase[];
  time_elapsed: number;
}
