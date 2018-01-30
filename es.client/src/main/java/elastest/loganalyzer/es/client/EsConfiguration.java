package elastest.loganalyzer.es.client;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@Configuration
@ComponentScan("elastest.loganalyzer.es.client")
@PropertySource("classpath:application.properties")
@EnableElasticsearchRepositories(basePackages = "elastest/loganalyzer/es/client/repository")
public class EsConfiguration {
}