package elastest.loganalyzer.es.client.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import elastest.loganalyzer.es.client.model.Tab;
import elastest.loganalyzer.es.client.service.TabService;

@RestController
@RequestMapping("/tabs")
public class TabRest {

	private final TabService tabService;

	@Autowired
	public TabRest(TabService tabService) {
		this.tabService = tabService;
	}

	@RequestMapping(value = "/project/{project}", method = RequestMethod.GET)
	public List<Tab> getAll(@PathVariable String project) {
		return tabService.findByProject(project);
	}

}
