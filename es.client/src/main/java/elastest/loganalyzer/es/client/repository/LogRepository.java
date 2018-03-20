package elastest.loganalyzer.es.client.repository;

import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchCrudRepository;
import org.springframework.stereotype.Repository;

import elastest.loganalyzer.es.client.model.Log;

@Repository
public interface LogRepository extends ElasticsearchCrudRepository<Log, String> {

	List<Log> findByLoggerContainingIgnoreCaseAndProjectAndTestOrderByIdAsc(String logger, String project, String test);

	List<Log> findByProject(String project);

	List<Log> findByProjectAndTestAndMessageContainingIgnoreCaseOrderByIdAsc(String project, String test,
			String message);

	List<Log> findByTestAndProjectAndThreadOrderByIdAsc(String test, String project, String thread);

	List<Log> findByTabAndTestAndProjectOrderByIdAsc(String tab, String test, String project);

	List<Log> findByTestOrderByIdAsc(String test);

	List<Log> findByLoggerContainingIgnoreCaseAndProjectAndTestAndMethodOrderByIdAsc(String logger, String project,
			String test, String method);

	List<Log> findByTestAndProjectOrderByIdAsc(String test, String project);
	
	List<Log> findByTabAndProject(String tab, String project);

	List<Log> findByTabAndProjectAndTestAndLevelOrderByIdAsc(String tab, String project, String test, String level);

	List<Log> findByTabAndProjectAndTestAndMessageContainingIgnoreCaseOrderByIdAsc(String tab, String project,
			String test, String message);
}