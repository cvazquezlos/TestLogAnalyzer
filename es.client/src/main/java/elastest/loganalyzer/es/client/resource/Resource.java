package elastest.loganalyzer.es.client.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import elastest.loganalyzer.es.client.EsConfiguration;
import elastest.loganalyzer.es.client.model.Log;
import elastest.loganalyzer.es.client.service.ESProjectService;

@RestController
@RequestMapping("/files")
@Import(EsConfiguration.class)
public class Resource {
	
	private final ESProjectService esProjectService;

	@Autowired
	public Resource(ESProjectService esProjectService) {
		this.esProjectService = esProjectService;
	}
	
	private String recentProject;
	
	@Autowired
	private ElasticsearchOperations elasticsearchTemplate;

	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public String upload(@RequestBody MultipartFile file) {
		try {
			if (file != null) {
				String indexName = recentProject + "_exec_" + esProjectService.findByName(recentProject).getNum_execs();
				elasticsearchTemplate.createIndex(indexName.replaceAll("\"", "").toLowerCase());
				elasticsearchTemplate.putMapping(indexName, "logs", elasticsearchTemplate.getMapping(Log.class));
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
