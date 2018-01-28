package elastest.loganalyzer.es.client.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "laprojects", type ="projects")
public class ProjectL {

	@Id
	private String id;
	
	private String name;
	private int num_execs;
	
	public ProjectL() {
	}
	
	public ProjectL(String id, String name, int num_execs) {
		this.id = id;
		this.name = name;
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
