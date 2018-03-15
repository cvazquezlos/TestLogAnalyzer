package elastest.loganalyzer.es.client.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "cluster", type = "logs")
public class Log {

	@Id
	private String id;

	private String level;
	private String log;
	private String logger;
	private String message;
	private String method;
	private String project;
	private String thread;
	private String test;
	private String timestamp;
	private String type;

	public Log() {
		this.message = "-";
		this.method = "-";
	}

	public Log(String id, String log, String message, String project, String test, String type) {
		this.id = id;
		this.level = "-";
		this.log = log;
		this.logger = "-";
		this.message = message;
		this.method = "-";
		this.project = project;
		this.thread = "-";
		this.test = test;
		this.timestamp = "-";
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getLog() {
		return log;
	}

	public void setLog(String log) {
		this.log = log;
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

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

	public String getThread() {
		return thread;
	}

	public void setThread(String thread) {
		this.thread = thread;
	}

	public String getTest() {
		return test;
	}

	public void setTest(String test) {
		this.test = test;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "Log{" + "log='" + log + '\'' + ", timestamp='" + timestamp + '\'' + ", thread='" + thread + '\''
				+ ", level='" + level + '\'' + ", logger='" + logger + '\'' + ", message='" + message + '\''
				+ ", test='" + test + "\'}";
	}
}
