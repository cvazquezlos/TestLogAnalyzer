package elastest.loganalyzer.es.client.repository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import elastest.loganalyzer.es.client.model.Tab;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class TabRepositoryTest {

	@Autowired
	private TabRepository repository;
	
	@Before
	public void pre() {
	}
	
	@Test
	public void shouldReturnAddedId() {
		// Given
		Tab t1 = new Tab(99999999, "JUnit4ClassTestingTLA1", "Demo1");
		Tab t2 = new Tab(99999998, "JUnit4ClassTestingTLA1", "Demo2");
		// When
		Tab returnedValue1 = repository.save(t1);
		Tab returnedValue2 = repository.save(t2);
		// Then
		assertEquals(returnedValue1.toString(), t1.toString());
		assertEquals(returnedValue2.toString(), t2.toString());
	}
	
	@Test
	public void shouldFindByProject() {
		// Given
		Tab t1 = new Tab(99999999, "JUnit4ClassTestingTLA1", "Demo1");
		Tab t2 = new Tab(99999998, "JUnit4ClassTestingTLA1", "Demo2");
		String project = "JUnit4ClassTestingTLA1";
		repository.save(t1);
		repository.save(t2);
		// When
		List<Tab> tabs = repository.findByProject(project);
		// Then
		assertNotNull(tabs);
		assertEquals(tabs.size(), 2);
		repository.delete(t1);
		repository.delete(t2);
	}

	@Test
	public void shouldCountSuccessfully() {
		// Given: Not nullable accounting.
		// When
		long count = repository.count();
		// Then
		assertNotNull(count);
	}
}
