package elastest.loganalyzer.es.client.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import elastest.loganalyzer.es.client.model.Project;
import elastest.loganalyzer.es.client.service.LogService;
import elastest.loganalyzer.es.client.service.ProjectService;
import elastest.loganalyzer.es.client.service.TabService;

@RestController
@RequestMapping("/projects")
public class ProjectRest {

	private final LogService logService;
	private final ProjectService projectService;
	private final TabService tabService;

	@Autowired
	public ProjectRest(LogService logService, ProjectService projectService, TabService tabService) {
		this.logService = logService;
		this.projectService = projectService;
		this.tabService = tabService;
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<Project> getAll() {
		Iterable<Project> projects = projectService.findAll();
		List<Project> result = new ArrayList<Project>();
		for (Project project : projects) {
			result.add(project);
		}
		return result;
	}

	@RequestMapping(value = "/name/{name}", method = RequestMethod.GET)
	public Project getProject(@PathVariable String name) {
		return projectService.findByName(name);
	}

	@RequestMapping(value = "", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public int addLocation(@RequestBody Project project) {
		project.setRecently_deleted(-1);
		return projectService.save(project);
	}

	@RequestMapping(value = "/remove/id/{id}", method = RequestMethod.DELETE)
	public Project delete(@PathVariable int id) {
		Project deleted = projectService.findOne(id);
		logService.deleteIterable(logService.findByProject(deleted.getName()));
		tabService.deleteIterable(tabService.findByProject(deleted.getName()));
		projectService.delete(deleted);
		return deleted;
	}
}
