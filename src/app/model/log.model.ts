export interface Log {
  id: string;
  test_no?: any;
  entire_log: string;
  timestamp: any;
  thread_name: string;
  level: string;
  logger_name: string;
  formatted_message: string;
  method: string
}
