package elastest.loganalyzer.es.client.model;

import java.util.ArrayList;
import java.util.List;

import org.apache.maven.plugins.surefire.report.ReportTestCase;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "executions", type = "executions")
public class Execution {

	public static Execution findGreater(List<Execution> executions) {
		Execution execution;
		if (executions.size() == 0) {
			execution = new Execution();
			execution.setId(-1);
		} else {
			execution = executions.get(0);
			for (int i = 1; i < executions.size(); i++) {
				if (execution.getId() < executions.get(i).getId()) {
					execution = executions.get(i);
				}
			}
		}
		return execution;
	}

	@Id
	private int id;
	private int entries;
	private int errors;
	private int failures;
	private int flakes;
	private String project;
	private int skipped;
	private String start_date;
	private String status;
	private int tests;
	private List<ReportTestCase> testcases;

	private float time_elapsed;

	public Execution() {
	}

	public Execution(int id) {
		super();
		this.id = id;
		this.errors = 0;
		this.failures = 0;
		this.flakes = 0;
		this.skipped = 0;
		this.tests = 0;
		this.testcases = new ArrayList<ReportTestCase>();
		this.time_elapsed = 0.0f;
	}

	public Execution(int id, int entries, int errors, int failures, int flakes, String project, int skipped,
			String start_date, String status, int tests, List<ReportTestCase> testcases, float time_elapsed) {
		super();
		this.id = id;
		this.entries = entries;
		this.errors = errors;
		this.failures = failures;
		this.flakes = flakes;
		this.project = project;
		this.skipped = skipped;
		this.start_date = start_date;
		this.status = status;
		this.tests = tests;
		this.testcases = testcases;
		this.time_elapsed = time_elapsed;
	}

	public int getEntries() {
		return entries;
	}

	public int getErrors() {
		return errors;
	}

	public int getFailures() {
		return failures;
	}

	public int getFlakes() {
		return flakes;
	}

	public int getId() {
		return id;
	}

	public String getProject() {
		return project;
	}

	public int getSkipped() {
		return skipped;
	}

	public String getStart_date() {
		return start_date;
	}

	public String getStatus() {
		return status;
	}

	public List<ReportTestCase> getTestcases() {
		return testcases;
	}

	public int getTests() {
		return tests;
	}

	public float getTime_elapsed() {
		return time_elapsed;
	}

	public void setEntries(int entries) {
		this.entries = entries;
	}

	public void setErrors(int errors) {
		this.errors = errors;
	}

	public void setFailures(int failures) {
		this.failures = failures;
	}

	public void setFlakes(int flakes) {
		this.flakes = flakes;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setProject(String project) {
		this.project = project;
	}

	public void setSkipped(int skipped) {
		this.skipped = skipped;
	}

	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setTestcases(List<ReportTestCase> testcases) {
		this.testcases = testcases;
	}

	public void setTests(int tests) {
		this.tests = tests;
	}

	public void setTime_elapsed(float time_elapsed) {
		this.time_elapsed = time_elapsed;
	}

	@Override
	public String toString() {
		return "Execution [id=" + id + ", entries=" + entries + ", errors=" + errors + ", failures=" + failures
				+ ", flakes=" + flakes + ", project=" + project + ", skipped=" + skipped + ", start_date=" + start_date
				+ ", status=" + status + ", tests=" + tests + ", testcases=" + testcases + ", time_elapsed="
				+ time_elapsed + "]";
	}
}