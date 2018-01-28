package elastest.loganalyzer.es.client.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "projects", type ="projects")
public class Project {

	@Id
	private String id;
	
	private int num_execs;
	
	public Project() {
	}
	
	public Project(String id, int num_execs) {
		this.id = id;
		this.num_execs = num_execs;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getNum_execs() {
		return num_execs;
	}

	public void setNum_execs(int num_execs) {
		this.num_execs = num_execs;
	}
}
