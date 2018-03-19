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

	public List<Log> findByLevel(String level, int page, int size) {
		return repository.findByLevel(level, new PageRequest(page, size)).getContent();
	}

	public List<Log> findByLoggerOrderByIdAsc(String logger) {
		return repository.findByLoggerOrderByIdAsc(logger);
	}

	public List<Log> findByLoggerContainingIgnoreCaseAndProjectAndTestOrderByIdAsc(String logger, String project,
			String test) {
		return repository.findByLoggerContainingIgnoreCaseAndProjectAndTestOrderByIdAsc(logger, project, test);
	}

	public List<Log> findByProject(String project) {
		return repository.findByProject(project);
	}

	public int findByProjectAndTestAndLevel(String test, String project, String level) {
		List<Log> logs = repository.findByProjectAndTestAndLevel(project, test, level);
		return logs.size();
	}

	public List<Log> findByProjectAndTestAndMessageContainingIgnoreCaseOrderByIdAsc(String test, String project,
			String partialMessage) {
		return repository.findByProjectAndTestAndMessageContainingIgnoreCaseOrderByIdAsc(project, test, partialMessage);
	}

	public List<Log> findByTestAndProjectAndThreadOrderByIdAsc(String testNo, String project, String thread) {
		return repository.findByTestAndProjectAndThreadOrderByIdAsc(testNo, project, thread);
	}

	public List<Log> findByTabAndTestAndProjectOrderByIdAsc(String tab, String test, String project) {
		return repository.findByTabAndTestAndProjectOrderByIdAsc(tab, test, project);
	}

	public List<Log> findByTestOrderByIdAsc(String test) {
		return repository.findByTestOrderByIdAsc(test);
	}

	public Log findOne(String id) {
		return repository.findOne(id);
	}

	public String save(Log log) {
		return repository.save(log).getId();
	}

	public List<Log> findByLoggerAndProjectAndTestAndMethodOrderByIdAsc(String logger, String project, String testNo,
			String method) {
		return repository.findByLoggerAndProjectAndTestAndMethodOrderByIdAsc(logger, project, testNo, method);
	}

	public List<Log> findByLoggerContainingIgnoreCaseAndProjectAndTestAndMethodOrderByIdAsc(String logger,
			String project, String testNo, String method) {
		return repository.findByLoggerContainingIgnoreCaseAndProjectAndTestAndMethodOrderByIdAsc(logger, project,
				testNo, method);
	}

	public List<Log> findByTestAndProjectOrderByIdAsc(String testNo, String project) {
		return repository.findByTestAndProjectOrderByIdAsc(testNo, project);
	}

	public int findByTabAndProjectAndTestAndLevel(String tab, String project, String test, String level) {
		List<Log> logs = repository.findByTabAndProjectAndTestAndLevel(tab, project, test, level);
		return logs.size();
	}

	public List<Log> findByTabAndProjectAndTestAndMessageContainingIgnoreCaseOrderByIdAsc(String tab, String project,
			String test, String partialMessage) {
		return repository.findByTabAndProjectAndTestAndMessageContainingIgnoreCaseOrderByIdAsc(tab, project, test, partialMessage);
	}
}