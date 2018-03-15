package elastest.loganalyzer.es.client.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "projects", type = "projects")
public class Project {

	@Id
	private int id;	

	private String name;
	private int num_execs;
	private int recently_deleted;

	public Project() {
	}

	public Project(int id, String name, int num_execs, int recently_deleted) {
		this.id = id;
		this.name = name;
		this.num_execs = num_execs;
		this.recently_deleted = recently_deleted;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getNum_execs() {
		return num_execs;
	}

	public void setNum_execs(int num_execs) {
		this.num_execs = num_execs;
	}

	public int getRecently_deleted() {
		return recently_deleted;
	}

	public void setRecently_deleted(int recently_deleted) {
		this.recently_deleted = recently_deleted;
	}

	@Override
	public String toString() {
		return "Project [id=" + id + ", name=" + name + ", num_execs=" + num_execs + ", recently_deleted="
				+ recently_deleted + "]";
	}
}
