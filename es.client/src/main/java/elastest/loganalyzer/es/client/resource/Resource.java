package elastest.loganalyzer.es.client.resource;

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

import elastest.loganalyzer.es.client.model.Project;
import elastest.loganalyzer.es.client.service.ESLogService;
import elastest.loganalyzer.es.client.service.ESProjectService;
import elastest.loganalyzer.es.client.service.ExecutionParserService;

@RestController
@RequestMapping("/files")
public class Resource {

	private final ESProjectService esProjectService;
	private final ESLogService esLogService;
	private final ExecutionParserService executionParserService;
	private final Collection<String> loggedErrors = new ArrayList<String>();
	private ConsoleLogger consoleLogger;
	private static String recentProject;

	@Autowired
	public Resource(ESProjectService esProjectService, ExecutionParserService executionParserService,
			ESLogService esLogService) {
		this.esProjectService = esProjectService;
		this.esLogService = esLogService;
		this.executionParserService = executionParserService;
	}

	@Before
	public void instantiateLogger() {
		consoleLogger = new ConsoleLogger() {
			public boolean isDebugEnabled() {
				return true;
			}

			@Override
			public void debug(String message) {
			}

			public boolean isInfoEnabled() {
				return true;
			}

			@Override
			public void info(String message) {
			}

			public boolean isWarnEnabled() {
				return true;
			}

			@Override
			public void warning(String message) {
				loggedErrors.add(message);
			}

			public boolean isErrorEnabled() {
				return true;
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
				if (file.getName().contains("txt")) {
					List<String> data = executionParserService.getStreamByFile(file);
					Project target = esProjectService.findByName(recentProject);
					target.setNum_execs(target.getNum_execs() + 1);
					esProjectService.save(target);
					this.executionParserService.parse(data, target, Lists.newArrayList(esLogService.findAll()).size());
				} else {
					TestSuiteXmlParser parser = new TestSuiteXmlParser(consoleLogger);
					InputStream inputStream = file.getInputStream();
					InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "UTF-8");
					List<ReportTestSuite> tests = parser.parse(inputStreamReader);
					System.out.println(tests);
				}
			} else {
				System.out.println("Fail");
			}
			return "200";
		} catch (Exception e) {
			return "400";
		}
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public String update(@RequestBody String name) {
		recentProject = name;
		return recentProject;
	}

	@RequestMapping(value = "/url", method = RequestMethod.POST)
	public List<String> uploadFile(@RequestBody String url) throws Exception {
		List<String> data = executionParserService.getStreamByUrl(url);
		Project target = esProjectService.findByName(recentProject);
		target.setNum_execs(target.getNum_execs() + 1);
		esProjectService.save(target);
		this.executionParserService.parse(data, target, Lists.newArrayList(esLogService.findAll()).size());
		return executionParserService.getStreamByUrl(url);
	}
}
