package elastest.loganalyzer.es.client.resource;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import elastest.loganalyzer.es.client.model.Log;
import elastest.loganalyzer.es.client.model.Project;
import elastest.loganalyzer.es.client.model.Tab;
import elastest.loganalyzer.es.client.service.ESLogService;
import elastest.loganalyzer.es.client.service.ESProjectService;
import elastest.loganalyzer.es.client.service.ESTabService;

@RestController
@RequestMapping("/projects")
public class ProjectResource {

	private final ESLogService esLogService;
	private final ESProjectService esProjectService;
	private final ESTabService esTabService;

	@Autowired
	public ProjectResource(ESLogService esLogService, ESProjectService esProjectService, ESTabService esTabService) {
		this.esLogService = esLogService;
		this.esProjectService = esProjectService;
		this.esTabService = esTabService;
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<Project> getAll() {
		Iterable<Project> projects = esProjectService.findAll();
		List<Project> result = new ArrayList<Project>();
		for (Project project : projects) {
			result.add(project);
		}
		return result;
	}

	@RequestMapping(method = RequestMethod.GET, path = "/id/{id}")
	public Project getLog(@PathVariable int id) {
		return esProjectService.findOne(id);
	}

	@RequestMapping(value = "/name/{name}", method = RequestMethod.GET)
	public Project getProject(@PathVariable String name) {
		return esProjectService.findByName(name);
	}

	@RequestMapping(value = "", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public int addLocation(@RequestBody Project project) {
		project.setRecently_deleted(-1);
		return esProjectService.save(project);
	}

	@RequestMapping(value = "/remove/id/{id}", method = RequestMethod.DELETE)
	public Project delete(@PathVariable int id) {
		Project deleted = esProjectService.findOne(id);
		esLogService.deleteIterable(esLogService.findByProject(deleted.getName()));
		esTabService.deleteIterable(esTabService.findByProject(deleted.getName()));
		esProjectService.delete(deleted);
		return deleted;
	}
}
