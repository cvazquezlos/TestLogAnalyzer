package elastest.loganalyzer.es.client.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.collect.Lists;

import elastest.loganalyzer.es.client.model.Project;
import elastest.loganalyzer.es.client.service.ESLogService;
import elastest.loganalyzer.es.client.service.ESProjectService;
import elastest.loganalyzer.es.client.service.ExecutionParserService;

@RestController
@RequestMapping("/files")
public class Resource {
	
	private final ESProjectService esProjectService;
	private final ESLogService esLogService;
	private final ExecutionParserService executionParserService;
	
	private static String recentProject;

	@Autowired
	public Resource(ESProjectService esProjectService, ExecutionParserService executionParserService, ESLogService esLogService) {
		this.esProjectService = esProjectService;
		this.esLogService = esLogService;
		this.executionParserService = executionParserService;
	}

	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public String upload(@RequestBody MultipartFile file) {
		try {
			if (file != null) {
				Project target = esProjectService.findByName(recentProject);
				this.executionParserService.parse(file, target, Lists.newArrayList(esLogService.findAll()).size());
				target.setNum_execs(target.getNum_execs() + 1);
				esProjectService.save(target);
			} else {
				System.out.println("Fail");
			}
			return "200";
		} catch (Exception e) {
			return "400";
		}
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public String update(@RequestBody String name) {
		recentProject = name;
		return recentProject;
	}

}
