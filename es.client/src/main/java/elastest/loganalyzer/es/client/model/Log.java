package elastest.loganalyzer.es.client.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "loganalyzer", type = "logs")
public class Log {

	@Id
	private String id;

	private String test_no;
	private String entire_log;
	private String method;
	private String timestamp;
	private String thread_name;
	private String level;
	private String logger_name;
	private String formatted_message;

	public Log() {
	}

	public Log(String id, String test_no, String entire_log) {
		this.id = id;
		this.test_no = test_no;
		this.entire_log = entire_log;
		this.method = "-";
		this.timestamp = "-";
		this.thread_name = "-";
		this.level = "-";
		this.logger_name = "-";
		this.formatted_message = "-";
	}

	public Log(String id, String test_no, String entire_log, String level, String formatted_message) {
		this.id = id;
		this.test_no = test_no;
		this.entire_log = entire_log;
		this.method = "-";
		this.timestamp = "-";
		this.thread_name = "-";
		this.level = level;
		this.logger_name = "-";
		this.formatted_message = formatted_message;
	}

	public Log(String id, String test_no, String entire_log, String formatted_message) {
		this.id = id;
		this.test_no = test_no;
		this.entire_log = entire_log;
		this.method = "-";
		this.timestamp = "-";
		this.thread_name = "-";
		this.level = "-";
		this.logger_name = "-";
		this.formatted_message = formatted_message;
	}

	public Log(String id, String test_no, String entire_log, String method, String timestamp, String thread_name, String level,
			String logger_name, String formatted_message) {
		this.id = id;
		this.test_no = test_no;
		this.entire_log = entire_log;
		this.method = method;
		this.timestamp = timestamp;
		this.thread_name = thread_name;
		this.level = level;
		this.logger_name = logger_name;
		this.formatted_message = formatted_message;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
}
