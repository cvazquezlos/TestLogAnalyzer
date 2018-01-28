package elastest.loganalyzer.es.client.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchCrudRepository;
import org.springframework.stereotype.Repository;

import elastest.loganalyzer.es.client.model.ProjectL;

@Repository
public interface ProjectRepository extends ElasticsearchCrudRepository<ProjectL, String> {

    @Query("{\"bool\":{\"filter\":{\"id\":\"?0\"}}}")
	Page<ProjectL> findById(String id, Pageable page);
    
    @Query("{\"bool\":{\"filter\":{\"name\":\"?0\"}}}")
	ProjectL findByName(String name);
}
