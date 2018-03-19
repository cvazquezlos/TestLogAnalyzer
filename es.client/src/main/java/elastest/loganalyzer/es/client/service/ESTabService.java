package elastest.loganalyzer.es.client.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import elastest.loganalyzer.es.client.model.Tab;
import elastest.loganalyzer.es.client.repository.TabRepository;

@Service
public class ESTabService {

	private final TabRepository repository;
	
	@Autowired
	public ESTabService(TabRepository repository) {
		this.repository = repository;
	}

	public void delete(Tab type) {
		repository.delete(type);
	}
	
	public void deleteIterable(Iterable<Tab> tabs) {
		repository.delete(tabs);
	}
	
	public Iterable<Tab> findAll() {
		return repository.findAll();
	}
	
	public List<Tab> findByProject(String project) {
		return repository.findByProject(project);
	}
	
	public Tab findByTabAndProject(String tab, String project) {
		System.out.println(repository.findByTabAndProject(tab, project));
		return repository.findByTabAndProject(tab, project);
	}

	public Integer save(Tab type) {
		return repository.save(type).getId();
	}
	
}
