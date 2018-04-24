package elastest.loganalyzer.es.client.repository;

import org.springframework.data.elasticsearch.repository.ElasticsearchCrudRepository;
import org.springframework.stereotype.Repository;

import elastest.loganalyzer.es.client.model.Project;

@Repository
public interface ProjectRepository extends ElasticsearchCrudRepository<Project, Integer> {

	Project findByName(String name);
}
