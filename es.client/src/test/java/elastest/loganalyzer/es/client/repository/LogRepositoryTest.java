package elastest.loganalyzer.es.client.repository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import elastest.loganalyzer.es.client.model.Log;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class LogRepositoryTest {

	@Autowired
	private LogRepository repository;

	@Before
	public void pre() {
	}

	@Test
	public void shouldReturnAddedId() {
		// Given
		Log l1 = new Log("99999998",
				"2018-04-09 14:25:06.823  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Reading https://chromedriver.storage.googleapis.com/ to seek [chromedriver]",
				"Reading https://chromedriver.storage.googleapis.com/ to seek [chromedriver]", "JUnit4ClassTestingTLA", "Demo", "01");
		Log l2 = new Log("99999999", "2018-04-09 14:25:47.419  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging out successful for Teacher",
				"Logging out successful for Teacher", "JUnit4ClassTestingTLA", "Demo", "01");
		// When
		Log returnedValue1 = repository.save(l1);
		Log returnedValue2 = repository.save(l2);
		// Then
		assertEquals(returnedValue1.toString(), l1.toString());
		assertEquals(returnedValue2.toString(), l2.toString());
		repository.delete(l1);
		repository.delete(l2);
	}
	
	@Test
	public void shouldReturnNullByIncompleteData() {
		// Given
		Log l1 = new Log("99999998",
				"2018-04-09 14:25:06.823  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Reading https://chromedriver.storage.googleapis.com/ to seek [chromedriver]",
				"Reading https://chromedriver.storage.googleapis.com/ to seek [chromedriver]", "JUnit4ClassTestingTLA", "Demo", "01");
		Log l2 = new Log("99999999", "2018-04-09 14:25:47.419  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging out successful for Teacher",
				"Logging out successful for Teacher", "JUnit4ClassTestingTLA", "Demo", "01");
		// When
		repository.save(l1);
		repository.save(l2);
		// Then
		assertEquals("-", l1.getLevel());
		assertEquals("-", l1.getLogger());
		assertEquals("-", l1.getMethod());
		assertEquals("-", l1.getThread());
		assertEquals("-", l1.getTimestamp());
		assertEquals("-", l2.getLevel());
		assertEquals("-", l2.getLogger());
		assertEquals("-", l2.getMethod());
		assertEquals("-", l2.getThread());
		assertEquals("-", l2.getTimestamp());
		repository.delete(l1);
		repository.delete(l2);
	}
	
	@Test
	public void shouldFindAnyValueByTabAndProject() {
		// Given
		Log l1 = new Log("99999998",
				"2018-04-09 14:25:06.823  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Reading https://chromedriver.storage.googleapis.com/ to seek [chromedriver]",
				"Reading https://chromedriver.storage.googleapis.com/ to seek [chromedriver]", "JUnit4ClassTestingTLA", "Demo", "01");
		Log l2 = new Log("99999999", "2018-04-09 14:25:47.419  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging out successful for Teacher",
				"Logging out successful for Teacher", "JUnit4ClassTestingTLA", "Demo", "01");
		String tab = "Demo";
		String project = "JUnit4ClassTestingTLA";
		repository.save(l1);
		repository.save(l2);
		// When
		List<Log> logs = repository.findByTabAndProject(tab, project);
		// Then
		assertNotNull(logs);
		assertEquals(logs.size(), 2);
		repository.delete(l1);
		repository.delete(l2);
	}
	
	@Test
	public void shouldDeleteById() {
		// Given
		Log l1 = new Log("99999998",
				"2018-04-09 14:25:06.823  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Reading https://chromedriver.storage.googleapis.com/ to seek [chromedriver]",
				"Reading https://chromedriver.storage.googleapis.com/ to seek [chromedriver]", "JUnit4ClassTestingTLA", "Demo", "01");
		String id = "99999998";
		repository.save(l1);
		// When
		Log returnedValue = repository.findOne(id);
		// Then
		assertEquals(returnedValue.toString(), l1.toString());
		repository.delete(l1);
	}
	
	@Test
	public void shouldDontExist() {
		// Given
		Log l1 = new Log("99999998",
				"2018-04-09 14:25:06.823  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Reading https://chromedriver.storage.googleapis.com/ to seek [chromedriver]",
				"Reading https://chromedriver.storage.googleapis.com/ to seek [chromedriver]", "JUnit4ClassTestingTLA", "Demo", "01");
		Log l2 = new Log("99999999", "2018-04-09 14:25:47.419  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging out successful for Teacher",
				"Logging out successful for Teacher", "JUnit4ClassTestingTLA", "Demo", "01");
		String id1 = "99999998";
		String id2 = "99999999";
		// When
		repository.save(l1);
		repository.save(l2);
		repository.delete(l1);
		repository.delete(l2);
		boolean v1 = repository.exists(id1);
		boolean v2 = repository.exists(id2);
		// Then
		assertFalse(v1);
		assertFalse(v2);
	}
}
