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

	List<Log> findByLoggerOrderByIdAsc(String logger);

	List<Log> findByLoggerContainingIgnoreCaseAndProjectAndTestOrderByIdAsc(String logger, String project, String test);

	List<Log> findByProject(String project);

	List<Log> findByProjectAndTestAndLevel(String project, String test, String level);

	List<Log> findByProjectAndTestAndMessageContainingIgnoreCaseOrderByIdAsc(String project, String test,
			String message);

	List<Log> findByTestAndProjectAndThreadOrderByIdAsc(String testNo, String project, String thread);

	List<Log> findByTabAndTestAndProjectOrderByIdAsc(String tab, String test, String project);

	List<Log> findByTestOrderByIdAsc(String test);

	List<Log> findByLoggerAndProjectAndTestAndMethodOrderByIdAsc(String logger, String project, String testNo,
			String method);

	List<Log> findByLoggerContainingIgnoreCaseAndProjectAndTestAndMethodOrderByIdAsc(String logger, String project,
			String testNo, String method);

	List<Log> findByTestAndProjectOrderByIdAsc(String testNo, String project);

	List<Log> findByTabAndProjectAndTestAndLevel(String tab, String project, String test, String level);

	List<Log> findByTabAndProjectAndTestAndMessageContainingIgnoreCaseOrderByIdAsc(String tab, String project,
			String test, String message);

}