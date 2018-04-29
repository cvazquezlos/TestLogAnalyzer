package elastest.loganalyzer.es.client.repository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import elastest.loganalyzer.es.client.model.Project;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class ProjectRepositoryTest {

	@Autowired
	private ProjectRepository repository;

	@Before
	public void pre() {
	}

	@Test
	public void shouldCountSuccessfully() {
		// Given: Not nullable accounting.
		// When
		long count = repository.count();
		// Then
		assertNotNull(count);
	}

	@Test
	public void shouldDontExist() {
		// Given
		Project p1 = new Project(99999998, "JUnit4ClassTestingTLA2", 6);
		Project p2 = new Project(99999997, "JUnit4ClassTestingTLA3", 1);
		int id1 = 99999998;
		int id2 = 99999997;
		// When
		repository.save(p1);
		repository.save(p2);
		repository.delete(p1);
		repository.delete(p2);
		boolean v1 = repository.exists(id1);
		boolean v2 = repository.exists(id2);
		// Then
		assertFalse(v1);
		assertFalse(v2);
	}

	@Test
	public void shouldFindAnyValue() {
		// Given
		Project p1 = new Project(99999999, "JUnit4ClassTestingTLA1", 2);
		Project p2 = new Project(99999998, "JUnit4ClassTestingTLA2", 6);
		Project p3 = new Project(99999997, "JUnit4ClassTestingTLA3", 1);
		String project = "JUnit4ClassTestingTLA1";
		repository.save(p1);
		repository.save(p2);
		repository.save(p3);
		// When
		Project returnedValue = repository.findByName(project);
		// Then
		assertNotEquals(returnedValue.toString(), p2.toString());
		assertNotEquals(returnedValue.toString(), p3.toString());
		assertEquals(returnedValue.toString(), p1.toString());
		repository.delete(p1);
		repository.delete(p2);
		repository.delete(p3);
	}

	@Test
	public void shouldReturnAddedId() {
		// Given
		Project p1 = new Project(99999999, "JUnit4ClassTestingTLA1", 2);
		Project p2 = new Project(99999998, "JUnit4ClassTestingTLA2", 6);
		Project p3 = new Project(99999997, "JUnit4ClassTestingTLA3", 1);
		// When
		Project returnedValue1 = repository.save(p1);
		Project returnedValue2 = repository.save(p2);
		Project returnedValue3 = repository.save(p3);
		// Then
		assertEquals(returnedValue1.toString(), p1.toString());
		assertEquals(returnedValue2.toString(), p2.toString());
		assertEquals(returnedValue3.toString(), p3.toString());
		repository.delete(p1);
		repository.delete(p2);
		repository.delete(p3);
	}
}
