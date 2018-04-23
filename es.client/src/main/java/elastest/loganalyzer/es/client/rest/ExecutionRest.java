package elastest.loganalyzer.es.client.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import elastest.loganalyzer.es.client.model.Execution;
import elastest.loganalyzer.es.client.service.ExecutionService;
import elastest.loganalyzer.es.client.service.LogService;

@RestController
@RequestMapping("/executions")
public class ExecutionRest {

	private final ExecutionService executionService;
	private final LogService logService;

	@Autowired
	public ExecutionRest(ExecutionService executionService, LogService logService) {
		this.executionService = executionService;
		this.logService = logService;
	}

	@RequestMapping(value = "/project/{project}", method = RequestMethod.GET)
	public List<Execution> getByProject(@PathVariable String project,
			@RequestParam(name = "tab", required = true) String tab) {
		return executionService.findByProjectAndTabOrderById(project, tab);
	}

	@RequestMapping(value = "/test/{test}", method = RequestMethod.GET)
	public Execution getByTest(@PathVariable String test) {
		return executionService.findByTestId(test);
	}

	@RequestMapping(value = "/id/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable int id) {
		Execution execution = executionService.findOne(id);
		logService.deleteIterable(logService.findByTestOrderByIdAsc(execution.getTest()));
		executionService.delete(execution);
	}
}
