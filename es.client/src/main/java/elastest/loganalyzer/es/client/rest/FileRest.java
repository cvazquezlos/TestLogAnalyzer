package elastest.loganalyzer.es.client.rest;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.apache.maven.plugin.surefire.log.api.ConsoleLogger;
import org.apache.maven.plugins.surefire.report.ReportTestSuite;
import org.apache.maven.plugins.surefire.report.TestSuiteXmlParser;
import org.junit.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.collect.Lists;

import elastest.loganalyzer.es.client.model.Execution;
import elastest.loganalyzer.es.client.model.Log;
import elastest.loganalyzer.es.client.model.Project;
import elastest.loganalyzer.es.client.model.Tab;
import elastest.loganalyzer.es.client.service.LogService;
import elastest.loganalyzer.es.client.service.ProjectService;
import elastest.loganalyzer.es.client.service.TabService;
import elastest.loganalyzer.es.client.service.ExecutionParserService;
import elastest.loganalyzer.es.client.service.ExecutionService;

@RestController
@RequestMapping("/files")
public class FileRest {

	private ConsoleLogger consoleLogger;
	private String testNumber;
	private final Collection<String> loggedErrors = new ArrayList<String>();
	private final ExecutionParserService executionParserService;
	private final ExecutionService executionService;
	private final LogService logService;
	private final ProjectService projectService;
	private final TabService tabService;
	private static String recentProject;
	private static String recentTab;

	@Autowired
	public FileRest(ExecutionParserService executionParserService, ExecutionService executionService,
			LogService logService, ProjectService projectService, TabService tabService) {
		this.executionParserService = executionParserService;
		this.executionService = executionService;
		this.logService = logService;
		this.projectService = projectService;
		this.tabService = tabService;
	}

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
	public String upload(@RequestBody MultipartFile file) {
		try {
			if (file != null) {
				if (file.getOriginalFilename().contains("txt")) {
					List<String> data = executionParserService.getStreamByFile(file);
					Project target = projectService.findByName(recentProject);
					testNumber = this.executionParserService.parse(data, target, recentTab,
							Lists.newArrayList(logService.findAll()).size());
				} else {
					TestSuiteXmlParser parser = new TestSuiteXmlParser(consoleLogger);
					InputStream inputStream = file.getInputStream();
					InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "UTF-8");
					List<ReportTestSuite> tests = parser.parse(inputStreamReader);
					ReportTestSuite test = tests.get(0);
					Execution execution = new Execution(Lists.newArrayList(executionService.findAll()).size(), 999,
							test.getNumberOfErrors(), test.getNumberOfFailures(), test.getNumberOfFlakes(),
							recentProject, test.getNumberOfSkipped(), "", "UNKNOWN", recentTab, test.getNumberOfTests(),
							testNumber, test.getTestCases(), test.getTimeElapsed());
					List<Log> logs = logService.findByTabAndTestAndProjectOrderByIdAsc(recentTab, testNumber,
							recentProject);
					execution.setEntries(logs.size());
					execution.setStart_date(this.findLogWhoseTimestampIsUseful(logs));
					logs = logService.findByTabAndProjectAndTestAndMessageContainingIgnoreCaseOrderByIdAsc(recentTab,
							recentProject, testNumber, "BUILD");
					for (int j = 0; j < logs.size(); j++) {
						if (logs.get(j).getMessage().contains("BUILD ")) {
							if (logs.get(j).getMessage().length() > 2) {
								execution.setStatus(logs.get(j).getMessage());
								break;
							}
						}
					}
					executionService.save(execution);
				}
			} else {
				System.out.println("Fail");
			}
			return "200";
		} catch (Exception e) {
			return "400";
		}
	}

	@RequestMapping(value = "/project", method = RequestMethod.POST)
	public String updateProject(@RequestBody String project) {
		recentProject = project.replaceAll("\"", "");
		return "\"" + recentProject + "\"";
	}

	@RequestMapping(value = "/tab", method = RequestMethod.POST)
	public String updateTab(@RequestBody String tab) {
		recentTab = tab.replaceAll("\"", "");
		if (tabService.findByTabAndProject(recentTab, recentProject) == null) {
			Iterable<Tab> tabs = tabService.findAll();
			int id = 0;
			id = Lists.newArrayList(tabs).size();
			tabService.save(new Tab(id + 1, recentProject, recentTab));
		}
		return "\"" + recentTab + "\"";
	}

	@RequestMapping(value = "/url", method = RequestMethod.POST)
	public List<String> uploadFile(@RequestBody String url) throws Exception {
		List<String> data = executionParserService.getStreamByUrl(url);
		Project target = projectService.findByName(recentProject);
		target.setNum_execs(target.getNum_execs() + 1);
		projectService.save(target);
		this.executionParserService.parse(data, target, recentTab, Lists.newArrayList(logService.findAll()).size());
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
