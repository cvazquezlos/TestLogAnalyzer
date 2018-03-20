package elastest.loganalyzer.es.client.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import elastest.loganalyzer.es.client.model.Tab;
import elastest.loganalyzer.es.client.service.LogService;
import elastest.loganalyzer.es.client.service.TabService;

@RestController
@RequestMapping("/tabs")
public class TabRest {

	private final LogService logService;
	private final TabService tabService;

	@Autowired
	public TabRest(LogService logService, TabService tabService) {
		this.logService = logService;
		this.tabService = tabService;
	}

	@RequestMapping(value = "/project/{project}", method = RequestMethod.GET)
	public List<Tab> getAll(@PathVariable String project) {
		return tabService.findByProject(project);
	}
	
	@RequestMapping(value = "/remove/name/{name}", method = RequestMethod.DELETE)
	public Tab deleteByTab(@PathVariable String name,
			@RequestParam(name = "project", required = true) String project) {
		Tab target = tabService.findByTabAndProject(name, project);
		System.out.println(target);
		logService.deleteIterable(logService.findByTabAndProject(name, project));
		tabService.delete(target);
		return target;
	}

}
