package elastest.loganalyzer.es.client.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import elastest.loganalyzer.es.client.model.Log;
import elastest.loganalyzer.es.client.service.ESLogService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/logs")
public class LogResource {
	private final ESLogService esLogService;

	@Autowired
	public LogResource(ESLogService esLogService) {
		this.esLogService = esLogService;
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<?> addLocation(@RequestBody Log log) {
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(esLogService.save(log))
				.toUri();
		return ResponseEntity.created(uri).build();
	}

	@RequestMapping(method = RequestMethod.GET, value = "/id/{id}")
	public ResponseEntity<Log> getLog(@PathVariable String id) {
		Log log = esLogService.findOne(id);
		
		return new ResponseEntity<>(log, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/level/{level}")
	public ResponseEntity<List<Log>> getLogByLevel(@PathVariable String level,
			@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "size", defaultValue = "10") int size) {
		List<Log> log = esLogService.findByLevel(level, page, size);
		
		return new ResponseEntity<>(log, HttpStatus.OK);
	}
}