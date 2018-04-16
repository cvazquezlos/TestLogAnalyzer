package elastest.loganalyzer.es.client.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import elastest.loganalyzer.es.client.model.Log;
import elastest.loganalyzer.es.client.model.Project;
import elastest.loganalyzer.es.client.service.LogService;
import elastest.loganalyzer.es.client.service.ProjectService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/logs")
public class LogRest {

	private final LogService logService;
	private final ProjectService projectService;

	@Autowired
	public LogRest(LogService logService, ProjectService projectService) {
		this.logService = logService;
		this.projectService = projectService;
	}

	@RequestMapping(value = "/logger/{logger}", method = RequestMethod.GET)
	public List<?> getByLogger(@PathVariable String logger,
			@RequestParam(name = "project", required = true) String project,
			@RequestParam(name = "test", required = true) int test,
			@RequestParam(name = "method", required = false) String method) {
		String testNo = String.format("%02d", test);
		if (method == null) {
			List<Log> logs = logService.findByLoggerContainingIgnoreCaseAndProjectAndTestOrderByIdAsc(logger, project,
					testNo);
			List<String> methods = new ArrayList<String>();
			for (int i = 0; i < logs.size(); i++) {
				if (!methods.contains(logs.get(i).getMethod())) {
					methods.add(logs.get(i).getMethod());
				}
			}
			return methods;
		} else {
			return logService.findByLoggerContainingIgnoreCaseAndProjectAndTestAndMethodOrderByIdAsc(logger, project,
					testNo, method);
		}
	}

	@RequestMapping(value = "/test/{test}", method = RequestMethod.GET)
	public List<?> getByTest(@PathVariable int test, @RequestParam(value = "project", required = true) String project,
			@RequestParam(value = "classes", required = true) boolean classes,
			@RequestParam(value = "maven", required = false) boolean maven) {
		String testNo = String.format("%02d", test);
		if (classes) {
			List<Log> logs = logService.findByProjectAndTestAndMessageContainingIgnoreCaseOrderByIdAsc(project, testNo,
					"Running");
			List<String> classL = new ArrayList<String>();
			for (Log log : logs) {
				classL.add(log.getMessage());
			}
			return classL;
		} else {
			if (project == null) {
				return logService.findByTestOrderByIdAsc(testNo);
			} else {
				if (!maven) {
					return logService.findByTestAndProjectAndThreadOrderByIdAsc(testNo, project, "main");
				} else {
					return logService.findByTestAndProjectOrderByIdAsc(testNo, project);
				}
			}
		}
	}

	@RequestMapping(value = "/remove/test/{test}", method = RequestMethod.DELETE)
	public String deleteByTestAndProject(@PathVariable int test,
			@RequestParam(value = "project", required = true) String project) {
		String testNo = String.format("%02d", test);
		Project target = projectService.findByName(project);
		int idDeleted = Integer.valueOf(testNo);
		target.setRecently_deleted(idDeleted);
		target.setNum_execs(target.getNum_execs() - 1);
		logService.deleteIterable(logService.findByTestAndProjectOrderByIdAsc(testNo, project));
		projectService.save(target);
		return "200";
	}
}