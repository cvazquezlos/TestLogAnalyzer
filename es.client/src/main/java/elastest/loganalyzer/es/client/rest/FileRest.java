package elastest.loganalyzer.es.client.rest;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.apache.maven.plugin.surefire.log.api.ConsoleLogger;
import org.apache.maven.plugins.surefire.report.ReportTestCase;
import org.apache.maven.plugins.surefire.report.ReportTestSuite;
import org.apache.maven.plugins.surefire.report.TestSuiteXmlParser;
import org.junit.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.collect.Lists;

import elastest.loganalyzer.es.client.model.Execution;
import elastest.loganalyzer.es.client.model.Log;
import elastest.loganalyzer.es.client.model.Project;
import elastest.loganalyzer.es.client.service.LogService;
import elastest.loganalyzer.es.client.service.ProjectService;
import elastest.loganalyzer.es.client.service.ExecutionParserService;
import elastest.loganalyzer.es.client.service.ExecutionService;

@RestController
@RequestMapping("/api/files")
public class FileRest {

	private ConsoleLogger consoleLogger;
	private Execution execution;
	private String testNumber;
	private final Collection<String> loggedErrors = new ArrayList<String>();
	private static String recentProject;

	@Autowired
	private ExecutionParserService executionParserService;
	@Autowired
	private ExecutionService executionService;
	@Autowired
	private LogService logService;
	@Autowired
	private ProjectService projectService;

	@Before
	public void instantiateLogger() {
		consoleLogger = new ConsoleLogger() {
			@Override
			public void debug(String message) {
			}

			@Override
			public void info(String message) {
			}

			@Override
			public void warning(String message) {
				loggedErrors.add(message);
			}

			@Override
			public void error(String message) {
				loggedErrors.add(message);
			}

			@Override
			public void error(String message, Throwable t) {
				loggedErrors.add(message);
			}

			@Override
			public void error(Throwable t) {
				loggedErrors.add(t.getLocalizedMessage());
			}
		};
	}

	@RequestMapping(value = "/file", method = RequestMethod.POST)
	public ResponseEntity<String> postByUpload(@RequestBody List<MultipartFile> files) {
		try {
			if (files == null) {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			} else {
				while (!files.isEmpty()) {
					MultipartFile file = files.get(0);
					if (file == null) {
						files.remove(0);
						continue;
					} else {
						System.out.println(file);
						if (file.getOriginalFilename().contains("txt")) {
							List<String> data = executionParserService.getStreamByFile(file);
							Project target = projectService.findByName(recentProject);
							this.executionParserService.parse(data, target, Lists.newArrayList(logService.findAll()).size(), String.format("%02d", this.execution.getId()));
						} else {
							TestSuiteXmlParser parser = new TestSuiteXmlParser(consoleLogger);
							InputStream inputStream = file.getInputStream();
							InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "UTF-8");
							List<ReportTestSuite> tests = parser.parse(inputStreamReader);
							for (int i = 0; i < tests.size(); i++) {
								this.execution.setErrors(this.execution.getErrors() + tests.get(i).getNumberOfErrors());
								this.execution.setFailures(this.execution.getFailures() + tests.get(i).getNumberOfFailures());
								this.execution.setFlakes(this.execution.getFlakes() + tests.get(i).getNumberOfFlakes());
								this.execution.setSkipped(this.execution.getSkipped() + tests.get(i).getNumberOfSkipped());
								this.execution.setTests(this.execution.getTests() + tests.get(i).getNumberOfTests());
								List<ReportTestCase> testcases = this.execution.getTestcases();
								testcases.addAll(tests.get(i).getTestCases());
								this.execution.setTestcases(testcases);
								this.execution.setTime_elapsed(this.execution.getTime_elapsed() + tests.get(i).getTimeElapsed());
							}
						}
						files.remove(0);
					}
				}
				List<Log> logs = logService.findByTestAndProjectOrderByIdAsc(String.format("%02d", this.execution.getId()), recentProject);
				this.execution.setEntries(logs.size());
				this.execution.setStart_date(this.findLogWhoseTimestampIsUseful(logs));
				logs = logService.findByProjectAndTestAndMessageContainingIgnoreCaseOrderByIdAsc(recentProject,
						testNumber, "BUILD");
				for (int j = 0; j < logs.size(); j++) {
					if (logs.get(j).getMessage().contains("BUILD ")) {
						if (logs.get(j).getMessage().length() > 2) {
							this.execution.setStatus(logs.get(j).getMessage());
							break;
						}
					}
				}
				this.executionService.save(this.execution);
			}
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<String> postProject(@RequestBody String project) {
		recentProject = project.replaceAll("\"", "");
		this.execution = new Execution(Lists.newArrayList(executionService.findAll()).size() + 1);
		this.execution.setProject(this.recentProject);
		System.out.println(this.execution);
		this.executionService.save(this.execution);
		return new ResponseEntity<>("\"" + recentProject + "\"", HttpStatus.CREATED);
	}

	@RequestMapping(value = "/url", method = RequestMethod.POST)
	public List<String> postByUrl(@RequestBody String url) throws Exception {
		List<String> data = executionParserService.getStreamByUrl(url);
		Project target = projectService.findByName(recentProject);
		target.setNum_execs(target.getNum_execs() + 1);
		projectService.save(target);
		// this.executionParserService.parse(data, target, Lists.newArrayList(logService.findAll()).size());
		return executionParserService.getStreamByUrl(url);
	}

	private String findLogWhoseTimestampIsUseful(List<Log> logs) {
		for (int i = 0; i < logs.size(); i++) {
			if (logs.get(i).getTimestamp().length() > 3) {
				return logs.get(i).getTimestamp();
			}
		}
		return "";
	}
}
