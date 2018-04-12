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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.collect.Lists;

import elastest.loganalyzer.es.client.model.Project;
import elastest.loganalyzer.es.client.model.Tab;
import elastest.loganalyzer.es.client.service.LogService;
import elastest.loganalyzer.es.client.service.ProjectService;
import elastest.loganalyzer.es.client.service.TabService;
import elastest.loganalyzer.es.client.service.ExecutionParserService;

@RestController
@RequestMapping("/files")
public class FileRest {

	private ConsoleLogger consoleLogger;
	private final Collection<String> loggedErrors = new ArrayList<String>();
	private final ExecutionParserService executionParserService;
	private final LogService logService;
	private final ProjectService projectService;
	private final TabService tabService;
	private static String recentProject;
	private static String recentTab;

	@Autowired
	public FileRest(ExecutionParserService executionParserService, LogService logService, ProjectService projectService,
			TabService tabService) {
		this.executionParserService = executionParserService;
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
					this.executionParserService.parse(data, target, recentTab,
							Lists.newArrayList(logService.findAll()).size());
				} else {
					TestSuiteXmlParser parser = new TestSuiteXmlParser(consoleLogger);
					InputStream inputStream = file.getInputStream();
					InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "UTF-8");
					List<ReportTestSuite> tests = parser.parse(inputStreamReader);
					for (int i = 0; i < tests.size(); i++) {
						System.out.println("Classs name: " + tests.get(i).getFullClassName());
						System.out.println("Name: " + tests.get(i).getName());
						System.out.println("Errors: " + tests.get(i).getNumberOfErrors());
						System.out.println("Failures: " + tests.get(i).getNumberOfFailures());
						System.out.println("Flakes: " + tests.get(i).getNumberOfFlakes());
						System.out.println("Skipped: " + tests.get(i).getNumberOfSkipped());
						System.out.println("Tests: " + tests.get(i).getNumberOfTests());
						System.out.println("Package name: " + tests.get(i).getPackageName());
						System.out.println("Time elapsed: " + tests.get(i).getTimeElapsed());
						System.out.println("Tests cases: " + tests.get(i).getTestCases());
						List<ReportTestCase> testcases = tests.get(i).getTestCases();
						for (int j = 0; j < testcases.size(); j++) {
							System.out.println("   TEST " + j);
							System.out.println("      Class name: " + testcases.get(j).getClassName());
							System.out.println("      Failure detail: " + testcases.get(j).getFailureDetail());
							System.out.println("      Error line: " + testcases.get(j).getFailureErrorLine());
							System.out.println("      Failure message: " + testcases.get(j).getFailureMessage());
							System.out.println("      Failure type: " + testcases.get(j).getFailureType());
							System.out.println("      Full class name: " + testcases.get(j).getFullClassName());
							System.out.println("      Time: " + testcases.get(j).getTime());
							System.out.println("      Name: " + testcases.get(j).getName());
						}
					}
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
}
