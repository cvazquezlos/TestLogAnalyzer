package elastest.loganalyzer.es.client.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import elastest.loganalyzer.es.client.model.Project;
import elastest.loganalyzer.es.client.repository.ProjectRepository;

@Service
public class ProjectService {

	private final ProjectRepository repository;

	@Autowired
	public ProjectService(ProjectRepository repository) {
		this.repository = repository;
	}

	public void delete(Project project) {
		repository.delete(project);
	}

	public Iterable<Project> findAll() {
		return repository.findAll();
	}

	public Project findByName(String name) {
		return repository.findByName(name);
	}

	public Project findOne(int id) {
		return repository.findOne(id);

	}

	public int save(Project project) {
		return repository.save(project).getId();
	}
}
