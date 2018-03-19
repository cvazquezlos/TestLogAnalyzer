package elastest.loganalyzer.es.client.resource;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
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
import elastest.loganalyzer.es.client.model.Tab;
import elastest.loganalyzer.es.client.service.ESLogService;
import elastest.loganalyzer.es.client.service.ESProjectService;
import elastest.loganalyzer.es.client.service.ESTabService;
import elastest.loganalyzer.es.client.service.ExecutionParserService;

import static java.lang.Math.toIntExact;

@RestController
@RequestMapping("/files")
public class Resource {

	private ConsoleLogger consoleLogger;
	private final Collection<String> loggedErrors = new ArrayList<String>();
	private final ESLogService esLogService;
	private final ESProjectService esProjectService;
	private final ESTabService esTabService;
	private final ExecutionParserService executionParserService;
	private static String recentProject;
	private static String recentTab;

	@Autowired
	public Resource(ESLogService esLogService, ESProjectService esProjectService, ESTabService esTypeService, ExecutionParserService executionParserService) {
		this.esLogService = esLogService;
		this.esProjectService = esProjectService;
		this.esTabService = esTypeService;
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
		System.out.println(recentProject);
		System.out.println(recentTab);
		try {
			if (file != null) {
				if (file.getOriginalFilename().contains("txt")) {
					List<String> data = executionParserService.getStreamByFile(file);
					Project target = esProjectService.findByName(recentProject);
					this.executionParserService.parse(data, target, recentTab, Lists.newArrayList(esLogService.findAll()).size());
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

	@RequestMapping(value = "/project", method = RequestMethod.POST)
	public String updateProject(@RequestBody String project) {
		recentProject = project.replaceAll("\"", "");
		return "\"" + recentProject + "\"";
	}

	@RequestMapping(value = "/tab", method = RequestMethod.POST)
	public String updateTab(@RequestBody String tab) {
		System.out.println(tab);
		recentTab = tab.replaceAll("\"", "");
		if (esTabService.findByTabAndProject(recentTab, recentProject) == null) {
			System.out.println("Create " + recentTab);
			Iterable<Tab> tabs = esTabService.findAll();
			System.out.println(tabs);
			int id = 0;
			// A PARTTIR DE AQUÍ NO FUNCIONA.
			id = Lists.newArrayList(tabs).size();
			/*Iterator<Tab> iterator = tabs.iterator();
			while (iterator.hasNext()) {
				id += 1;
			}*/
			System.out.println(id);
			esTabService.save(new Tab(id + 1, recentProject, recentTab));
		}
		return "\"" + recentTab + "\"";
	}

	@RequestMapping(value = "/url", method = RequestMethod.POST)
	public List<String> uploadFile(@RequestBody String url) throws Exception {
		List<String> data = executionParserService.getStreamByUrl(url);
		Project target = esProjectService.findByName(recentProject);
		target.setNum_execs(target.getNum_execs() + 1);
		esProjectService.save(target);
		this.executionParserService.parse(data, target, recentTab, Lists.newArrayList(esLogService.findAll()).size());
		return executionParserService.getStreamByUrl(url);
	}
}
