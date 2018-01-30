package elastest.loganalyzer.es.client.resource;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

	@RequestMapping(value = "", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public int addLocation(@RequestBody Project project) {
		System.out.println("Hey");
		System.out.println(project);
		return esProjectService.save(project);
	}

	@RequestMapping(method = RequestMethod.GET, path = "/id/{id}")
	public Project getLog(@PathVariable int id) {
		return esProjectService.findOne(id);
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Iterable<Project>> getAll() {
		Iterable<Project> projects = esProjectService.findAll();
		
		return new ResponseEntity<>(projects, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, path = "/name/{name}")
	public Project getProject(@PathVariable String name) {
		return esProjectService.findByName(name);
	}
}
