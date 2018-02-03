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
	public ResponseEntity<Log> getLog(@PathVariable String id) {
		Log log = esLogService.findOne(id);

		return new ResponseEntity<>(log, HttpStatus.OK);
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
			List<Log> logs = esLogService.findByTest(test);
			execution.setEntries(logs.size());
			Log selected = this.findLog(logs);
			execution.setTimestamp(selected.getTimestamp());
			execution.setDebug(2);
			execution.setError(0);
			execution.setStatus("SUCCESS");
			execution.setWarning(0);
			execution.setInfo(10);
			execs.add(execution);
		}
		return execs;
	}

	@RequestMapping(value = "/test/{test}", method = RequestMethod.GET)
	public List<Log> getLogByTestno(@PathVariable String test) {
		System.out.println(test);
		return esLogService.findByTest(test);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<?> addLocation(@RequestBody Log log) {
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(esLogService.save(log))
				.toUri();
		return ResponseEntity.created(uri).build();
	}
	
	private Log findLog(List<Log> logs) {
		for (int i = 0; i < logs.size(); i++) {
			System.out.println(logs.get(i).getTimestamp());
			if (logs.get(i).getTimestamp() != "-") {
				System.out.println("TIL HERE: " + logs.get(i));
				return logs.get(i);
			}
		}
		return new Log();
	}
}