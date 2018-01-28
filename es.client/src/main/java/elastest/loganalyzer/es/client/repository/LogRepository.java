package elastest.loganalyzer.es.client.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchCrudRepository;
import org.springframework.stereotype.Repository;

import elastest.loganalyzer.es.client.model.Log;

@Repository
public interface LogRepository extends ElasticsearchCrudRepository<Log, String> {
    
	Page<Log> findByLevel(String level, Pageable pageable);

}