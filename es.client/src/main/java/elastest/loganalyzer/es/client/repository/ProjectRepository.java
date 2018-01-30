package elastest.loganalyzer.es.client.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchCrudRepository;
import org.springframework.stereotype.Repository;

import elastest.loganalyzer.es.client.model.Project;

@Repository
public interface ProjectRepository extends ElasticsearchCrudRepository<Project, Integer> {

	Page<Project> findById(int id, Pageable page);

	Project findByName(String name);
}
