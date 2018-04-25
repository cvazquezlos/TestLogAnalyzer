package elastest.loganalyzer.es.client.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import elastest.loganalyzer.es.client.model.Project;
import elastest.loganalyzer.es.client.service.LogService;
import elastest.loganalyzer.es.client.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
public class ProjectRest {

	@Autowired
	private LogService logService;
	@Autowired
	private ProjectService projectService;

	@Autowired
	public ProjectRest(LogService logService, ProjectService projectService) {
		this.logService = logService;
		this.projectService = projectService;
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity<List<Project>> getAll() {
		Iterable<Project> projects = projectService.findAll();
		List<Project> result = new ArrayList<Project>();
		for (Project project : projects) {
			result.add(project);
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/name/{name}", method = RequestMethod.GET)
	public ResponseEntity<Project> getByName(@PathVariable String name) {
		return new ResponseEntity<>(projectService.findByName(name), HttpStatus.OK);
	}

	@RequestMapping(value = "", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Integer> post(@RequestBody Project project) {
		project.setRecently_deleted(-1);
		return new ResponseEntity<>(projectService.save(project), HttpStatus.CREATED);
	}

	@RequestMapping(value = "/id/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Project> deleteById(@PathVariable int id) {
		Project deleted = projectService.findOne(id);
		if (deleted != null) {
			logService.deleteIterable(logService.findByProject(deleted.getName()));
			projectService.delete(deleted);
			return new ResponseEntity<>(deleted, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
