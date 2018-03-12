package elastest.loganalyzer.es.client.resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import elastest.loganalyzer.es.client.DiffMatchPatch;

@RestController
@RequestMapping("/diff")
public class DiffMatchPatchResource {

	private final DiffMatchPatch dmp = new DiffMatchPatch();
	
	
}
