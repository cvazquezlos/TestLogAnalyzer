package elastest.loganalyzer.es.client.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import elastest.loganalyzer.es.client.model.Project;
import elastest.loganalyzer.es.client.repository.ProjectRepository;

@Service
public class ESProjectService {

	private final ProjectRepository repository;

	@Autowired
	public ESProjectService(ProjectRepository repository) {
		this.repository = repository;
	}

	public void delete(Project project) {
		repository.delete(project);
	}

	public Iterable<Project> findAll() {
		return repository.findAll();
	}

	public List<Project> findById(String id, int page, int size) {
		return repository.findById(id, new PageRequest(page, size)).getContent();
	}

	public List<Project> findByName(String name, int page, int size) {
		return repository.findByName(name, new PageRequest(page, size)).getContent();
	}

	public Project findOne(String id) {
		return repository.findOne(id);

	}

	public String save(Project project) {
		return repository.save(project).getId();
	}
}
