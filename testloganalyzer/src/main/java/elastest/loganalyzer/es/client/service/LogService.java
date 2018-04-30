package elastest.loganalyzer.es.client.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import elastest.loganalyzer.es.client.model.Log;
import elastest.loganalyzer.es.client.repository.LogRepository;

@Service
public class LogService {

	private final LogRepository repository;

	@Autowired
	public LogService(LogRepository repository) {
		this.repository = repository;
	}

	public void deleteIterable(Iterable<Log> logs) {
		repository.delete(logs);
	}

	public Iterable<Log> findAll() {
		return repository.findAll();
	}
	
	public List<Log> findByLoggerContainingIgnoreCaseAndProjectAndTestAndMethodOrderByIdAsc(String logger,
			String project, String test, String method) {
		return repository.findByLoggerContainingIgnoreCaseAndProjectAndTestAndMethodOrderByIdAsc(logger, project, test,
				method);
	}

	public List<Log> findByLoggerContainingIgnoreCaseAndProjectAndTestOrderByIdAsc(String logger, String project,
			String test) {
		return repository.findByLoggerContainingIgnoreCaseAndProjectAndTestOrderByIdAsc(logger, project, test);
	}

	public List<Log> findByProject(String project) {
		return repository.findByProject(project);
	}

	public int findByProjectAndTestAndLevelOrderByIdAsc(String project, String test, String level) {
		List<Log> logs = repository.findByProjectAndTestAndLevelOrderByIdAsc(project, test, level);
		return logs.size();
	}

	public List<Log> findByProjectAndTestAndMessageContainingIgnoreCaseOrderByIdAsc(String project, String test,
			String partialMessage) {
		return repository.findByProjectAndTestAndMessageContainingIgnoreCaseOrderByIdAsc(project, test, partialMessage);
	}

	public List<Log> findByTestAndProjectAndThreadOrderByIdAsc(String test, String project, String thread) {
		return repository.findByTestAndProjectAndThreadOrderByIdAsc(test, project, thread);
	}

	public List<Log> findByTestAndProjectOrderByIdAsc(String test, String project) {
		return repository.findByTestAndProjectOrderByIdAsc(test, project);
	}

	public List<Log> findByTestOrderByIdAsc(String test) {
		return repository.findByTestOrderByIdAsc(test);
	}

	public Iterable<Log> save(Iterable<Log> logs) {
		return repository.save(logs);
	}
}