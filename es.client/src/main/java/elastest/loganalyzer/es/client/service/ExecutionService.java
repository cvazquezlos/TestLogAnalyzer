package elastest.loganalyzer.es.client.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import elastest.loganalyzer.es.client.model.Execution;
import elastest.loganalyzer.es.client.repository.ExecutionRepository;

@Service
public class ExecutionService {

	private final ExecutionRepository repository;

	@Autowired
	public ExecutionService(ExecutionRepository repository) {
		this.repository = repository;
	}

	public void delete(Execution execution) {
		repository.delete(execution);
	}

	public void deleteById(int id) {
		repository.delete(id);
	}

	public void deleteIterable(List<Execution> executions) {
		repository.delete(executions);
	}

	public Iterable<Execution> findAll() {
		return repository.findAll();
	}

	public List<Execution> findByProject(String project) {
		return repository.findByProject(project);
	}

	public List<Execution> findByProjectAndTabOrderById(String project, String tab) {
		return repository.findByProjectAndTabOrderById(project, tab);
	}

	public Execution findByTestId(String test) {
		return repository.findByTest(test);
	}

	public Execution findOne(int id) {
		return repository.findOne(id);
	}

	public int save(Execution execution) {
		return repository.save(execution).getId();
	}
}
