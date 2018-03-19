package elastest.loganalyzer.es.client.repository;

import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchCrudRepository;
import org.springframework.stereotype.Repository;

import elastest.loganalyzer.es.client.model.Tab;

@Repository
public interface TabRepository extends ElasticsearchCrudRepository<Tab, Integer> {
	
	Tab findByTab(String tab);

	List<Tab> findByProject(String project);

	Tab findByTabAndProject(String tab, String project);
}
