package elastest.loganalyzer.es.client.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import elastest.loganalyzer.es.client.model.Log;
import elastest.loganalyzer.es.client.repository.LogRepository;

import java.util.List;

@Service
public class ESLogService {
	private final LogRepository repository;

	@Autowired
	public ESLogService(LogRepository repository) {
		this.repository = repository;
	}

	public void delete(Log log) {
		repository.delete(log);
	}

	public Iterable<Log> findAll() {
		return repository.findAll();
	}

	public Log findOne(String id) {
		return repository.findOne(id);
	}

	public String save(Log log) {
		return repository.save(log).getId();
	}

	public List<Log> findByLevel(String level, int page, int size) {
		return repository.findByLevel(level, new PageRequest(page, size)).getContent();
	}
	
	public List<Log> findByProject(String project) {
		return repository.findByProject(project);
	}
	
	public List<Log> findByTest(String test) {
		return repository.findByTest(test);
	}
	
	public List<Log> findByTestAndProject(String test, String project) {
		return repository.findByTestAndProject(test, project);
	}
	
	public Log findByProjectAndTestAndMessageContainingIgnoreCase(String test, String project) {
		List<Log> logs = repository.findByProjectAndTestAndMessageContainingIgnoreCase(project, test, "BUILD");
		for (int i = 0; i < logs.size(); i++) {
			if (logs.get(i).getMessage().contains("BUILD ")) {
				return logs.get(i);
			}
		}
		return new Log();
	}
	
	public int findByProjectAndTestAndLevel(String test, String project, String level) {
		List<Log> logs = repository.findByProjectAndTestAndLevel(project, test, level);
		return logs.size();
	}
}