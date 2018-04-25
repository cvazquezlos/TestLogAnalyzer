package elastest.loganalyzer.es.client.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import elastest.loganalyzer.es.client.model.Log;
import elastest.loganalyzer.es.client.model.Project;
import elastest.loganalyzer.es.client.service.LogService;
import elastest.loganalyzer.es.client.service.ProjectService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/logs")
public class LogRest {

	@Autowired
	private LogService logService;
	@Autowired
	private ProjectService projectService;

	@RequestMapping(value = "/logger/{logger}", method = RequestMethod.GET)
	public ResponseEntity<List<?>> getByLogger(@PathVariable String logger,
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
			return new ResponseEntity<>(methods, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(
					logService.findByLoggerContainingIgnoreCaseAndProjectAndTestAndMethodOrderByIdAsc(logger, project,
							testNo, method),
					HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/test/{test}", method = RequestMethod.GET)
	public ResponseEntity<List<?>> getByTest(@PathVariable int test,
			@RequestParam(value = "project", required = true) String project,
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
			return new ResponseEntity<>(classL, HttpStatus.OK);
		} else {
			if (project == null) {
				return new ResponseEntity<>(logService.findByTestOrderByIdAsc(testNo), HttpStatus.OK);
			} else {
				if (!maven) {
					return new ResponseEntity<>(
							logService.findByTestAndProjectAndThreadOrderByIdAsc(testNo, project, "main"),
							HttpStatus.OK);
				} else {
					return new ResponseEntity<>(logService.findByTestAndProjectOrderByIdAsc(testNo, project),
							HttpStatus.OK);
				}
			}
		}
	}

	@RequestMapping(value = "/test/{test}", method = RequestMethod.DELETE)
	public ResponseEntity<String> deleteByTestAndProject(@PathVariable int test,
			@RequestParam(value = "project", required = true) String project) {
		String testNo = String.format("%02d", test);
		Project target = projectService.findByName(project);
		if (target != null) {
			int idDeleted = Integer.valueOf(testNo);
			target.setRecently_deleted(idDeleted);
			target.setNum_execs(target.getNum_execs() - 1);
			logService.deleteIterable(logService.findByTestAndProjectOrderByIdAsc(testNo, project));
			projectService.save(target);
			return new ResponseEntity<>(HttpStatus.OK);	
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}