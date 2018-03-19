package elastest.loganalyzer.es.client.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "tabs", type = "tabs")
public class Tab {

	@Id
	private int id;

	private String project;
	private String tab;

	public Tab() {
	}

	public Tab(int id, String project, String tab) {
		this.id = id;
		this.project = project;
		this.tab = tab;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

	public String getTab() {
		return tab;
	}

	public void setTab(String tab) {
		this.tab = tab;
	}

	@Override
	public String toString() {
		return "Type [id=" + id + ", project=" + project + ", tab=" + tab + "]";
	}
}
