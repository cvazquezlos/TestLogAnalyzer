package elastest.loganalyzer.es.client;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.node.NodeBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@Configuration
@ComponentScan("elastest.loganalyzer.es.client")
@PropertySource("classpath:application.properties")
@EnableElasticsearchRepositories(basePackages = "elastest/loganalyzer/es/client/repository")
public class EsConfiguration {

	@Bean
	public NodeBuilder nodeBuilder() {
		return new NodeBuilder();
	}

	@Bean
	public ElasticsearchOperations elasticsearchTemplate() throws IOException {
		final Path tmpDir = Files.createTempDirectory(Paths.get(System.getProperty("java.io.tmpdir")), "elasticsearch_data");
		Settings.Builder elasticsearchSettings = Settings.settingsBuilder().put("http.enabled", "false")
				.put("path.data", tmpDir.toAbsolutePath().toString()).put("path.home", "C:\\elasticsearch-2.4.6");
		return new ElasticsearchTemplate(nodeBuilder()
				.local(true)
				.settings(elasticsearchSettings.build())
				.node()
				.client());
	}

}