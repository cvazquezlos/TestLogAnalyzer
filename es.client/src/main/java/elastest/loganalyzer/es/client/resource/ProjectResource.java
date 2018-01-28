package elastest.loganalyzer.es.client.resource;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import elastest.loganalyzer.es.client.model.Project;
import elastest.loganalyzer.es.client.service.ESProjectService;

@RestController
@RequestMapping("/projects")
public class ProjectResource {

	private final ESProjectService esProjectService;

	@Autowired
	public ProjectResource(ESProjectService esProjectService) {
		this.esProjectService = esProjectService;
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<?> addLocation(@RequestBody Project project) {
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(esProjectService.save(project)).toUri();
		return ResponseEntity.created(uri).build();
	}

	@RequestMapping(method = RequestMethod.GET, path = "/id/{id}")
	public Project getLog(@PathVariable String id) {
		return esProjectService.findOne(id);
	}
	
	@RequestMapping(method = RequestMethod.GET, path = "/name/{name}")
	public Project getProject(@PathVariable String name) {
		return esProjectService.findByName(name);
	}
}
