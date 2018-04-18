package elastest.loganalyzer.es.client.model;

import java.util.List;

import org.apache.maven.plugins.surefire.report.ReportTestCase;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "executions", type = "executions")
public class Execution {

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
	private String tab;
	private int tests;
	private String test;
	private List<ReportTestCase> testcases;
	private float time_elapsed;

	public Execution() {
	}

	public Execution(int id, int entries, int errors, int failures, int flakes, String project, int skipped,
			String start_date, String status, String tab, int tests, String test, List<ReportTestCase> testcases,
			float time_elapsed) {
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
		this.tab = tab;
		this.tests = tests;
		this.test = test;
		this.testcases = testcases;
		this.time_elapsed = time_elapsed;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getEntries() {
		return entries;
	}

	public void setEntries(int entries) {
		this.entries = entries;
	}

	public int getErrors() {
		return errors;
	}

	public void setErrors(int errors) {
		this.errors = errors;
	}

	public int getFailures() {
		return failures;
	}

	public void setFailures(int failures) {
		this.failures = failures;
	}

	public int getFlakes() {
		return flakes;
	}

	public void setFlakes(int flakes) {
		this.flakes = flakes;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

	public int getSkipped() {
		return skipped;
	}

	public void setSkipped(int skipped) {
		this.skipped = skipped;
	}

	public String getStart_date() {
		return start_date;
	}

	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTab() {
		return tab;
	}

	public void setTab(String tab) {
		this.tab = tab;
	}

	public int getTests() {
		return tests;
	}

	public void setTests(int tests) {
		this.tests = tests;
	}

	public String getTest() {
		return test;
	}

	public void setTest(String test) {
		this.test = test;
	}

	public List<ReportTestCase> getTestcases() {
		return testcases;
	}

	public void setTestcases(List<ReportTestCase> testcases) {
		this.testcases = testcases;
	}

	public float getTime_elapsed() {
		return time_elapsed;
	}

	public void setTime_elapsed(float time_elapsed) {
		this.time_elapsed = time_elapsed;
	}
}