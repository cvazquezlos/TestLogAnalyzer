package elastest.loganalyzer.es.client.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import elastest.loganalyzer.es.client.model.Tab;
import elastest.loganalyzer.es.client.service.ESTabService;

@RestController
@RequestMapping("/tabs")
public class TabResource {
	
	private final ESTabService esTabService;
	
	@Autowired
	public TabResource(ESTabService esTabService) {
		this.esTabService = esTabService;
	}
	
	@RequestMapping(value = "/project/{project}", method = RequestMethod.GET)
	public List<Tab> getAll(@PathVariable String project) {
		return esTabService.findByProject(project);
	}
	
}
