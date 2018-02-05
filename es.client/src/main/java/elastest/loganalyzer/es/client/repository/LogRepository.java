package elastest.loganalyzer.es.client.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchCrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import elastest.loganalyzer.es.client.model.Log;

@Repository
public interface LogRepository extends ElasticsearchCrudRepository<Log, String> {

	Page<Log> findByLevel(String level, Pageable pageable);

	List<Log> findByProject(String project);

	List<Log> findByTest(String test);

	List<Log> findByTestAndProject(String test, String project);
	
	List<Log> findByProjectAndTestAndMessageContaining(String project, String test, String message);
}