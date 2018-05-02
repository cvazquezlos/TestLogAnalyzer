package elastest.loganalyzer.es.client.rest;

import java.io.IOException;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.collect.Lists;

import elastest.loganalyzer.es.client.model.Execution;
import elastest.loganalyzer.es.client.model.Log;
import elastest.loganalyzer.es.client.model.Project;
import elastest.loganalyzer.es.client.service.ExecutionParserService;
import elastest.loganalyzer.es.client.service.ExecutionService;
import elastest.loganalyzer.es.client.service.LogService;
import elastest.loganalyzer.es.client.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
public class ProjectRest {

	private static String recentProject;
	private ConsoleLogger consoleLogger;
	private Execution execution;
	private String testNumber;
	private final Collection<String> loggedErrors = new ArrayList<String>();

	@Autowired
	private ExecutionService executionService;
	@Autowired
	private ExecutionParserService executionParserService;
	@Autowired
	private LogService logService;
	@Autowired
	private ProjectService projectService;

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Project> deleteById(@PathVariable int id) {
		Project deleted = projectService.findOne(id);
		System.out.println(deleted);
		if (deleted != null) {
			logService.deleteIterable(logService.findByProject(deleted.getName()));
			executionService.deleteIterable(executionService.findByProject(deleted.getName()));
			projectService.delete(deleted);
			return new ResponseEntity<>(deleted, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	private String findLogWhoseTimestampIsUseful(List<Log> logs) {
		for (int i = 0; i < logs.size(); i++) {
			if (logs.get(i).getTimestamp().length() > 3) {
				return logs.get(i).getTimestamp();
			}
		}
		return "";
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity<List<Project>> getAll() {
		Iterable<Project> projects = projectService.findAll();
		List<Project> result = new ArrayList<Project>();
		for (Project project : projects) {
			result.add(project);
		}
		if (result.size() > 0) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@RequestMapping(value = "/{name}", method = RequestMethod.GET)
	public ResponseEntity<Project> getByName(@PathVariable String name) {
		Project project = projectService.findByName(name);
		if (project != null) {
			return new ResponseEntity<>(project, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@Before
	public void instantiateLogger() {
		consoleLogger = new ConsoleLogger() {
			@Override
			public void debug(String message) {
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

			@Override
			public void info(String message) {
			}

			@Override
			public void warning(String message) {
				loggedErrors.add(message);
			}
		};
	}

	@RequestMapping(value = "/{project}", method = RequestMethod.POST)
	public ResponseEntity<Integer> post(@PathVariable String project, @RequestBody List<MultipartFile> files)
			throws IOException, Exception {
		Project target = projectService.findByName(project);
		if (target == null) {
			target = new Project(Project.findGreater(Lists.newArrayList(projectService.findAll())).getId() + 1, project,
					0);
			recentProject = project;
		}
		projectService.save(target);
		this.execution = new Execution(
				Execution.findGreater(Lists.newArrayList(executionService.findAll())).getId() + 1);
		this.execution.setProject(ProjectRest.recentProject);
		this.executionService.save(this.execution);
		if (files == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			for (int i = 0; i < files.size(); i++) {
				MultipartFile file = files.get(i);
				if (file == null) {
					continue;
				} else {
					if (file.getOriginalFilename().contains("txt")) {
						List<String> data = executionParserService.getStreamByFile(file);
						this.executionParserService.parse(data, target,
								Integer.valueOf(Log.findGreater(Lists.newArrayList(logService.findAll())).getId()) + 1,
								String.format("%02d", this.execution.getId()));
					} else {
						TestSuiteXmlParser parser = new TestSuiteXmlParser(consoleLogger);
						InputStream inputStream = file.getInputStream();
						InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "UTF-8");
						List<ReportTestSuite> tests = parser.parse(inputStreamReader);
						for (int j = 0; j < tests.size(); j++) {
							this.execution.setErrors(this.execution.getErrors() + tests.get(j).getNumberOfErrors());
							this.execution
									.setFailures(this.execution.getFailures() + tests.get(j).getNumberOfFailures());
							this.execution.setFlakes(this.execution.getFlakes() + tests.get(j).getNumberOfFlakes());
							this.execution.setSkipped(this.execution.getSkipped() + tests.get(j).getNumberOfSkipped());
							this.execution.setTests(this.execution.getTests() + tests.get(j).getNumberOfTests());
							List<ReportTestCase> testcases = this.execution.getTestcases();
							testcases.addAll(tests.get(j).getTestCases());
							this.execution.setTestcases(testcases);
							this.execution
									.setTime_elapsed(this.execution.getTime_elapsed() + tests.get(j).getTimeElapsed());
						}
					}
				}
			}
			List<Log> logs = logService.findByTestAndProjectOrderByIdAsc(String.format("%02d", this.execution.getId()),
					recentProject);
			this.execution.setEntries(logs.size());
			this.execution.setStart_date(this.findLogWhoseTimestampIsUseful(logs));
			logs = logService.findByProjectAndTestAndMessageContainingIgnoreCaseOrderByIdAsc(recentProject, testNumber,
					"BUILD");
			boolean fail = false;
			for (int j = 0; j < logs.size(); j++) {
				if (logs.get(j).getMessage().contains("BUILD FAILURE")) {
					if (logs.get(j).getMessage().length() > 2) {
						fail = true;
						break;
					}
				}
			}
			if (fail) {
				this.execution.setStatus("BUILD FAILURE");
			} else {
				this.execution.setStatus("BUILD SUCCESS");
			}
			this.executionService.save(this.execution);
		}
		return new ResponseEntity<>(this.execution.getId(), HttpStatus.CREATED);
	}
}
