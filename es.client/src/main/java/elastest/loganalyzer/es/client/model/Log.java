package elastest.loganalyzer.es.client.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "cluster", type = "logs")
public class Log {

	@Id
	private String id;

	private String project;

	private String test;
	private String log;
	private String method;
	private String timestamp;
	private String thread;
	private String level;
	private String logger;
	private String message;

	public Log() {
		this.message = "-";
	}

	public Log(String id, String project, String test, String log) {
		this.id = id;
		this.project = project;
		this.test = test;
		this.log = log;
		this.method = "-";
		this.timestamp = "-";
		this.thread = "-";
		this.level = "-";
		this.logger = "-";
		this.message = "-";
	}

	public Log(String id, String project, String test, String log, String level, String message) {
		this.id = id;
		this.project = project;
		this.test = test;
		this.log = log;
		this.method = "-";
		this.timestamp = "-";
		this.thread = "-";
		this.level = level;
		this.logger = "-";
		this.message = message;
	}

	public Log(String id, String project, String test, String log, String message) {
		this.id = id;
		this.project = project;
		this.test = test;
		this.log = log;
		this.method = "-";
		this.timestamp = "-";
		this.thread = "-";
		this.level = "-";
		this.logger = "-";
		this.message = message;
	}

	public Log(String id, String project, String test, String log, String method, String timestamp,
			String thread, String level, String logger, String message) {
		this.id = id;
		this.project = project;
		this.test = test;
		this.log = log;
		this.method = method;
		this.timestamp = timestamp;
		this.thread = thread;
		this.level = level;
		this.logger = logger;
		this.message = message;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

	public String getTest() {
		return test;
	}

	public void setTest(String test) {
		this.test = test;
	}

	public String getLog() {
		return log;
	}

	public void setLog(String log) {
		this.log = log;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public String getThread() {
		return thread;
	}

	public void setThread(String thread) {
		this.thread = thread;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getLogger() {
		return logger;
	}

	public void setLogger(String logger) {
		this.logger = logger;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "Log{" + "log='" + log + '\'' + ", timestamp='" + timestamp + '\'' + ", thread='"
				+ thread + '\'' + ", level='" + level + '\'' + ", logger='" + logger + '\''
				+ ", message='" + message + '\'' + ", test='" + test + "\'}";
	}
}
