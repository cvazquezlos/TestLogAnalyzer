package elastest.loganalyzer.es.client.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import elastest.loganalyzer.es.client.model.Execution;
import elastest.loganalyzer.es.client.model.Log;
import elastest.loganalyzer.es.client.model.Project;
import elastest.loganalyzer.es.client.service.ESLogService;
import elastest.loganalyzer.es.client.service.ESProjectService;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/logs")
public class LogResource {
	private final ESLogService esLogService;
	private final ESProjectService esProjectService;

	@Autowired
	public LogResource(ESLogService esLogService, ESProjectService esProjectService) {
		this.esLogService = esLogService;
		this.esProjectService = esProjectService;
	}

	@RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
	public Log getLog(@PathVariable String id) {
		Log log = esLogService.findOne(id);
		return log;
	}

	@RequestMapping(value = "/level/{level}", method = RequestMethod.GET)
	public ResponseEntity<List<Log>> getLogByLevel(@PathVariable String level,
			@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "size", defaultValue = "10") int size) {
		List<Log> log = esLogService.findByLevel(level, page, size);

		return new ResponseEntity<>(log, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/project/{project}", method = RequestMethod.GET)
	public List<Execution> getLogByProject(@PathVariable String project) {
		Project target = esProjectService.findByName(project);
		List<Execution> execs = new ArrayList<Execution>();
		for (int i = 0; i < target.getNum_execs(); i++) {
			Execution execution = new Execution();
			execution.setId(i + 1);
			String test = String.format("%02d", i + 1);
			List<Log> logs = esLogService.findByTestAndProjectOrderByIdAsc(test, project);
			execution.setEntries(logs.size());
			Log selected = this.findLog(logs);
			execution.setTimestamp(selected.getTimestamp());
			execution.setDebug(esLogService.findByProjectAndTestAndLevel(test, project, "DEBUG"));
			execution.setInfo(esLogService.findByProjectAndTestAndLevel(test, project, "INFO"));
			execution.setWarning(esLogService.findByProjectAndTestAndLevel(test, project, "WARNING"));
			execution.setError(esLogService.findByProjectAndTestAndLevel(test, project, "ERROR"));
			Log status = esLogService.findByProjectAndTestAndMessageContainingIgnoreCase(test, project);
			if (status.getMessage() == "-") {
				execution.setStatus("UNKNOWN");
			} else {
				execution.setStatus(status.getMessage());
			}
			execs.add(execution);
		}
		return execs;
	}

	@RequestMapping(value = "/test/{test}", method = RequestMethod.GET)
	public List<Log> getLogByTestno(@PathVariable int test, @RequestParam(value = "project", required = false) String project) {
		String testNo = String.format("%02d", test);
		if (project == null) {
			return esLogService.findByTestOrderByIdAsc(testNo);
		} else {
			return esLogService.findByTestAndProjectOrderByIdAsc(testNo, project);
		}
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<?> addLocation(@RequestBody Log log) {
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(esLogService.save(log))
				.toUri();
		return ResponseEntity.created(uri).build();
	}
	
	private Log findLog(List<Log> logs) {
		for (int i = 0; i < logs.size(); i++) {
			if (logs.get(i).getTimestamp().length() == 23) {
				return logs.get(i);
			}
		}
		return new Log();
	}

	@RequestMapping(value = "/remove/test/{test}", method = RequestMethod.DELETE)
	public String deleteByTestAndProject(@PathVariable int test, @RequestParam(value = "project", required = true) String project) {
		String testNo = String.format("%02d", test);
		List<Log> logs = esLogService.findByTestAndProjectOrderByIdAsc(testNo, project);
		Project target = esProjectService.findByName(project);
		target.setNum_execs(target.getNum_execs() - 1);
		for (int i = 0; i < logs.size(); i++) {
			esLogService.delete(logs.get(i));
		}
		esProjectService.save(target);
		return "200";
	}
}