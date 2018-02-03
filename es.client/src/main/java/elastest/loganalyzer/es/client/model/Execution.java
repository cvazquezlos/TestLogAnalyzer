package elastest.loganalyzer.es.client.model;

public class Execution {

	private int id;
	private String timestamp;
	private int entries;
	private String status;
	private int debug;
	private int info;
	private int warning;
	private int error;

	public Execution() {
	}

	public Execution(int id, String timestamp, int entries, String status, int debug, int info, int warning,
			int error) {
		super();
		this.id = id;
		this.timestamp = timestamp;
		this.entries = entries;
		this.status = status;
		this.debug = debug;
		this.info = info;
		this.warning = warning;
		this.error = error;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public int getEntries() {
		return entries;
	}

	public void setEntries(int entries) {
		this.entries = entries;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getDebug() {
		return debug;
	}

	public void setDebug(int debug) {
		this.debug = debug;
	}

	public int getInfo() {
		return info;
	}

	public void setInfo(int info) {
		this.info = info;
	}

	public int getWarning() {
		return warning;
	}

	public void setWarning(int warning) {
		this.warning = warning;
	}

	public int getError() {
		return error;
	}

	public void setError(int error) {
		this.error = error;
	}
}