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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import elastest.loganalyzer.es.client.model.Execution;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class ExecutionRepositoryTest {

	@Autowired
	private ExecutionRepository repository;
	private final Logger log = LoggerFactory.getLogger(ExecutionRepositoryTest.class);

	@Before
	public void pre() {
	}

	@Test
	public void ShouldReturnAddedId() {
		// Given
		Execution e1 = new Execution(99999998, 201, 23, 2, 34, "JUnit4ClassTestingTLA", 0, new Date().toString(),
				"BUILD SUCCESS", "Demo", 3, "01", new ArrayList<ReportTestCase>(), (float) 20.3);
		Execution e2 = new Execution(99999999, 43, 3, 4, 0, "JUnit4ClassTestingTLA", 3, new Date().toString(),
				"BUILD FAILURE", "Demo", 2, "01", new ArrayList<ReportTestCase>(), (float) 603.2);
		log.info("e2 entity created: " + e2.toString());
		// When
		Execution returnedValue1 = repository.save(e1);
		Execution returnedValue2 = repository.save(e2);
		// Then
		assertEquals(returnedValue1, e1);
		assertEquals(returnedValue2, e2);
	}

	@Test
	public void ShouldFindAnyValueByProject() {
		// Given
		String project = "JUnit4ClassTestingTLA";
		// When
		List<Execution> executions = repository.findByProject(project);
		// Then
		assertNotNull(executions);
		assertEquals(executions.size(), 2);
	}

	@Test
	public void ShouldCountSuccessfully() {
		// Given: Not nullable accounting.
		// When
		long count = repository.count();
		// Then
		assertNotNull(count);
	}

	@Test
	public void ShouldFindAnyValueByProjectAndTab() {
		// Given
		String project = "JUnit4ClassTestingTLA";
		String tab = "Demo";
		// When
		List<Execution> executions = repository.findByProjectAndTabOrderById(project, tab);
		// Then
		assertNotNull(executions);
		assertEquals(executions.size(), 2);
	}

	@Test
	public void ShouldDeleteById() {
		// Given
		int id1 = 99999998;
		int id2 = 99999999;
		// When
		repository.delete(id1);
		repository.delete(id2);
		// Then
		assertNull(repository.findOne(id1));
		assertNull(repository.findOne(id2));
	}

	@Test
	public void ShouldDontExist() {
		// Given
		int id1 = 99999998;
		int id2 = 99999999;
		// When
		boolean v1 = repository.exists(id1);
		boolean v2 = repository.exists(id2);
		// Then
		assertFalse(v1);
		assertFalse(v2);
	}
}
