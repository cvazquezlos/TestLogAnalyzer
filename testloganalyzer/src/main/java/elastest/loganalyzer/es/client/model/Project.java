package elastest.loganalyzer.es.client.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "projects", type = "projects")
public class Project {

	public static Project findGreater(List<Project> projects) {
		Project project;
		if (projects.size() == 0) {
			project = new Project();
			project.setId(-1);
		} else {
			project = projects.get(0);
			for (int i = 1; i < projects.size(); i++) {
				if (project.getId() < projects.get(i).getId()) {
					project = projects.get(i);
				}
			}
		}
		return project;
	}

	@Id
	private int id;
	private String name;

	private int num_execs;

	public Project() {
	}

	public Project(int id, String name, int num_execs) {
		this.id = id;
		this.name = name;
		this.num_execs = num_execs;
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public int getNum_execs() {
		return num_execs;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setNum_execs(int num_execs) {
		this.num_execs = num_execs;
	}

	@Override
	public String toString() {
		return "Project [id=" + id + ", name=" + name + ", num_execs=" + num_execs + "]";
	}
}
