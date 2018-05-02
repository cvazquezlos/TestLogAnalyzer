package elastest.loganalyzer.es.client.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "cluster", type = "logs")
public class Log {

	public static Log findGreater(List<Log> logs) {
		Log log;
		if (logs.size() == 0) {
			log = new Log();
			log.setId("-1");
		} else {
			log = logs.get(0);
			for (int i = 1; i < logs.size(); i++) {
				if (Integer.valueOf(log.getId()) < Integer.valueOf(logs.get(i).getId())) {
					log = logs.get(i);
				}
			}
		}
		return log;
	}

	@Id
	private String id;
	private String level;
	private String log;
	private String logger;
	private String message;
	private String method;
	private String project;
	private String test;
	private String thread;

	private String timestamp;

	public Log() {
		this.message = "-";
		this.method = "-";
	}

	public Log(String id, String log, String message, String project, String test) {
		this.id = id;
		this.level = "-";
		this.log = log;
		this.logger = "-";
		this.message = message;
		this.method = "-";
		this.project = project;
		this.test = test;
		this.thread = "-";
		this.timestamp = "-";
	}

	public String getId() {
		return id;
	}

	public String getLevel() {
		return level;
	}

	public String getLog() {
		return log;
	}

	public String getLogger() {
		return logger;
	}

	public String getMessage() {
		return message;
	}

	public String getMethod() {
		return method;
	}

	public String getProject() {
		return project;
	}

	public String getTest() {
		return test;
	}

	public String getThread() {
		return thread;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public void setLog(String log) {
		this.log = log;
	}

	public void setLogger(String logger) {
		this.logger = logger;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public void setProject(String project) {
		this.project = project;
	}

	public void setTest(String test) {
		this.test = test;
	}

	public void setThread(String thread) {
		this.thread = thread;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	@Override
	public String toString() {
		return "Log [id=" + id + ", level=" + level + ", log=" + log + ", logger=" + logger + ", message=" + message
				+ ", method=" + method + ", project=" + project + ", test=" + test + ", thread=" + thread
				+ ", timestamp=" + timestamp + "]";
	}
}
