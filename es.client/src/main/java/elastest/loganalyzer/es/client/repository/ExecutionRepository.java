package elastest.loganalyzer.es.client.repository;

import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchCrudRepository;
import org.springframework.stereotype.Repository;

import elastest.loganalyzer.es.client.model.Execution;

@Repository
public interface ExecutionRepository extends ElasticsearchCrudRepository<Execution, Integer> {

	List<Execution> findByProject(String project);

	List<Execution> findByProjectOrderById(String project);
}
