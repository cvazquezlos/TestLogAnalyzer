package elastest.loganalyzer.es.client.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Import;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.collect.Lists;

import elastest.loganalyzer.es.client.EsConfiguration;
import elastest.loganalyzer.es.client.model.Index;
import elastest.loganalyzer.es.client.model.Log;
import elastest.loganalyzer.es.client.model.Project;
import elastest.loganalyzer.es.client.service.ESLogService;
import elastest.loganalyzer.es.client.service.ESProjectService;
import elastest.loganalyzer.es.client.service.ExecutionParserService;

@RestController
@RequestMapping("/files")
@Import(EsConfiguration.class)
public class Resource {
	
	private final ESProjectService esProjectService;
	private final ESLogService esLogService;
	private final ExecutionParserService executionParserService;
	private final ApplicationContext context;
	
	private static String recentProject;
	private Index index;

	@Autowired
	public Resource(ESProjectService esProjectService, ExecutionParserService executionParserService, ESLogService esLogService) {
		this.esProjectService = esProjectService;
		this.esLogService = esLogService;
		this.executionParserService = executionParserService;
	    context = new ClassPathXmlApplicationContext("applicationContext.xml");
	}

	@Autowired
	private ElasticsearchOperations elasticsearchTemplate;

	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public String upload(@RequestBody MultipartFile file) {
		try {
			if (file != null) {
				Project target = esProjectService.findByName(recentProject);
				int numExecs = target.getNum_execs();
				String indexName = recentProject + "_exec_" + numExecs;
				indexName = indexName.replaceAll("\"", "").toLowerCase();
				elasticsearchTemplate.createIndex(indexName);
				System.out.println("Working 1");
				System.out.println(elasticsearchTemplate.getMapping("loganalyzer", "logs"));
				elasticsearchTemplate.putMapping(indexName, "logs", elasticsearchTemplate.getMapping("loganalyzer", "logs"));
				System.out.println(elasticsearchTemplate.getMapping(indexName, "logs"));	
				System.out.println((new String(file.getBytes(), "UTF-8")).split(System.getProperty("line.separator"))[0]);
		        //this.executionParserService.parse(file, target, Lists.newArrayList(esLogService.findAll()).size());
//				index = (Index) context.getBean("index");
//		        index.setV(indexName);
//		        Index index1 = (Index) context.getBean("index");
//		        System.out.println("New index name: " + index1.getV());
				/*elasticsearchTemplate.putMapping(indexName, "logs", );
				System.out.println("Working 2");
				System.out.println(elasticsearchTemplate.getMapping(indexName, "logs"));
				System.out.println("Working 3");
				/*index = indexName;
				System.out.println("Working 3: " + index);
				System.out.println(Lists.newArrayList(esLogService.findAll()).size());
				System.out.println(numExecs);
				this.executionParserService.parse(file, numExecs, Lists.newArrayList(esLogService.findAll()).size());
				target.setNum_execs(numExecs + 1);*/
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
