package elastest.loganalyzer.es.client.model;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "index")
public class Index {

	public String v;

	public Index() {
		this.v = "default";
	}
	
	public String getV() {
		return v;
	}

	public void setV(String v) {
		this.v = v;
	}
	
}
