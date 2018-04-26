package elastest.loganalyzer.es.client.repository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.maven.plugins.surefire.report.ReportTestCase;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import elastest.loganalyzer.es.client.model.Execution;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class ExecutionRepositoryTest {

	@Autowired
	private ExecutionRepository repository;
	// private final Logger log = LoggerFactory.getLogger(ExecutionRepositoryTest.class);

	@Before
	public void pre() {
	}

	@Test
	public void shouldReturnAddedId() {
		// Given
		Execution e1 = new Execution(99999998, 201, 23, 2, 34, "JUnit4ClassTestingTLA", 0, new Date().toString(),
				"BUILD SUCCESS", 3, new ArrayList<ReportTestCase>(), (float) 20.3);
		Execution e2 = new Execution(99999999, 43, 3, 4, 0, "JUnit4ClassTestingTLA", 3, new Date().toString(),
				"BUILD FAILURE", 2, new ArrayList<ReportTestCase>(), (float) 603.2);
		// When
		Execution returnedValue1 = repository.save(e1);
		Execution returnedValue2 = repository.save(e2);
		// Then
		assertEquals(returnedValue1, e1);
		assertEquals(returnedValue2, e2);
		repository.delete(e1);
		repository.delete(e2);
	}

	@Test
	public void shouldFindAnyValueByProject() {
		// Given
		Execution e1 = new Execution(99999997, 123, 2, 27, 1, "JUnit4ClassTestingTLA", 2, new Date().toString(),
				"BUILD UNKNOWN", 3, new ArrayList<ReportTestCase>(), (float) 0.3);
		String project = "JUnit4ClassTestingTLA";
		// When
		repository.save(e1);
		List<Execution> executions = repository.findByProject(project);
		// Then
		assertNotNull(executions);
		assertEquals(executions.size(), 1);
		repository.delete(e1);
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
	public void shouldFindAnyValueByProjectAndTab() {
		// Given
		Execution e1 = new Execution(99999996, 123, 13, 2, 1, "JUnit4ClassTestingTLA", 2, new Date().toString(),
				"BUILD UNKNOWN", 3, new ArrayList<ReportTestCase>(), (float) 0.3);
		Execution e2 = new Execution(99999995, 34, 20, 59, 6, "JUnit4ClassTestingTLA", 3, new Date().toString(),
				"BUILD UNKNOWN", 3, new ArrayList<ReportTestCase>(), (float) 80.6);
		Execution e3 = new Execution(99999994, 305, 45, 30, 2, "JUnit4ClassTestingTLA", 0, new Date().toString(),
				"BUILD UNKNOWN", 3, new ArrayList<ReportTestCase>(), (float) 2.0);
		String project = "JUnit4ClassTestingTLA";
		// When
		repository.save(e1);
		repository.save(e2);
		repository.save(e3);
		List<Execution> executions = repository.findByProjectOrderById(project);
		// Then
		assertNotNull(executions);
		assertEquals(executions.size(), 3);
		repository.delete(e1);
		repository.delete(e2);
		repository.delete(e3);
	}

	@Test
	public void shouldDeleteById() {
		// Given
		Execution e1 = new Execution(99999993, 201, 23, 2, 34, "JUnit4ClassTestingTLA", 0, new Date().toString(),
				"BUILD SUCCESS", 3, new ArrayList<ReportTestCase>(), (float) 20.3);
		Execution e2 = new Execution(99999992, 43, 3, 4, 0, "JUnit4ClassTestingTLA", 3, new Date().toString(),
				"BUILD FAILURE", 2, new ArrayList<ReportTestCase>(), (float) 603.2);
		int id1 = 99999993;
		int id2 = 99999992;
		// When
		repository.save(e1);
		repository.save(e2);
		repository.delete(id1);
		repository.delete(id2);
		// Then
		assertNull(repository.findOne(id1));
		assertNull(repository.findOne(id2));
	}

	@Test
	public void shouldDontExist() {
		// Given
		Execution e1 = new Execution(99999996, 123, 13, 2, 1, "JUnit4ClassTestingTLA", 2, new Date().toString(),
				"BUILD UNKNOWN", 3, new ArrayList<ReportTestCase>(), (float) 0.3);
		Execution e2 = new Execution(99999995, 34, 20, 59, 6, "JUnit4ClassTestingTLA", 3, new Date().toString(),
				"BUILD UNKNOWN", 3, new ArrayList<ReportTestCase>(), (float) 80.6);
		int id1 = 99999996;
		int id2 = 99999995;
		// When
		repository.save(e1);
		repository.save(e2);
		repository.delete(e1);
		repository.delete(e2);
		boolean v1 = repository.exists(id1);
		boolean v2 = repository.exists(id2);
		// Then
		assertFalse(v1);
		assertFalse(v2);
	}
}
