package elastest.loganalyzer.es.client.resource;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import elastest.loganalyzer.es.client.model.Log;
import elastest.loganalyzer.es.client.model.Project;
import elastest.loganalyzer.es.client.service.ESLogService;
import elastest.loganalyzer.es.client.service.ESProjectService;

@RestController
@RequestMapping("/projects")
public class ProjectResource {

	private final ESLogService esLogService;
	private final ESProjectService esProjectService;

	@Autowired
	public ProjectResource(ESProjectService esProjectService, ESLogService esLogService) {
		this.esLogService = esLogService;
		this.esProjectService = esProjectService;
	}

	@RequestMapping(value = "", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public int addLocation(@RequestBody Project project) {
		return esProjectService.save(project);
	}

	@RequestMapping(method = RequestMethod.GET, path = "/id/{id}")
	public Project getLog(@PathVariable int id) {
		return esProjectService.findOne(id);
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

	@RequestMapping(value = "/remove/{id}", method = RequestMethod.DELETE)
	public Project delete(@PathVariable int id) {
		Project deleted = esProjectService.findOne(id);
		List<Log> logs = esLogService.findByProject(deleted.getName());
		for (int i = 0; i < logs.size(); i++) {
			esLogService.delete(logs.get(i));
		}
		esProjectService.delete(deleted);
		return deleted;
	}

	@RequestMapping(method = RequestMethod.GET, path = "/name/{name}")
	public Project getProject(@PathVariable String name) {
		return esProjectService.findByName(name);
	}
}
