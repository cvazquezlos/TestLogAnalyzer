package elastest.loganalyzer.es.client.model;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "projects", type = "projects")
public class Project {

	@Id
	private int id;

	private ArrayList<Integer> assigned_ids;
	private String name;
	private int num_execs;
	private int recently_deleted;

	public Project() {
	}

	public Project(int id, String name, int num_execs, ArrayList<Integer> assigned_ids, int recently_deleted) {
		this.id = id;
		this.assigned_ids = assigned_ids;
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

	public ArrayList<Integer> getAssigned_ids() {
		return assigned_ids;
	}

	public void setAssigned_ids(ArrayList<Integer> assigned_ids) {
		this.assigned_ids = assigned_ids;
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
}
