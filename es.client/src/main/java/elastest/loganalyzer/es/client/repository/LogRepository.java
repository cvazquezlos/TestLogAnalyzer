package elastest.loganalyzer.es.client.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchCrudRepository;
import org.springframework.stereotype.Repository;

import elastest.loganalyzer.es.client.model.Log;

@Repository
public interface LogRepository extends ElasticsearchCrudRepository<Log, String> {

	Page<Log> findByLevel(String level, Pageable pageable);

	List<Log> findByProject(String project);

	List<Log> findByTestOrderByIdAsc(String test);

	List<Log> findByTestAndProjectOrderByIdAsc(String test, String project);
	
	List<Log> findByProjectAndTestAndMessageContainingIgnoreCase(String project, String test, String message);
	
	List<Log> findByProjectAndTestAndLevel(String project, String test, String level);
}