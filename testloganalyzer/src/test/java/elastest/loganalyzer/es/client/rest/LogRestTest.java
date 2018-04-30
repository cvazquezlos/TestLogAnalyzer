package elastest.loganalyzer.es.client.rest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import elastest.loganalyzer.es.client.EsConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@ContextConfiguration(classes = { LogRest.class, EsConfiguration.class })
@WebAppConfiguration
public class LogRestTest {

	private MockMvc mockMvc;

	@Autowired
	private WebApplicationContext wac;

	@Test
	public void getByLoggerTypeA() throws Exception {
		String logger = "JUnit4LoggerTestingLTA";
		String project = "JUnit4ClassTestingLTA";
		int test = 1;
		mockMvc.perform(get("/api/logs/logger/").param("logger", logger).param("project", project).param("test",
				String.valueOf(test))).andExpect(status().isNotFound());
	}

	@Test
	public void getByLoggerTypeB() throws Exception {
		String logger = "JUnit4LoggerTestingLTA";
		String project = "JUnit4ClassTestingLTA";
		int test = 1;
		String method = "JUnit4MethodTestingLTA";
		mockMvc.perform(get("/api/logs/logger/").param("logger", logger).param("project", project)
				.param("test", String.valueOf(test)).param("method", method)).andExpect(status().isNotFound());
	}

	@Test
	public void getByTestTypeA() throws Exception {
		String test = "JUnit4TestTestingLTA";
		String project = "JUnit4ProjectTestingLTA";
		boolean classes = true;
		mockMvc.perform(get("/api/logs/logger/").param("test", test).param("project", project).param("classes",
				String.valueOf(classes))).andExpect(status().isNotFound());
	}

	@Test
	public void getByTestTypeB() throws Exception {
		String test = "JUnit4TestTestingLTA";
		String project = "JUnit4ProjectTestingLTA";
		boolean classes = false;
		boolean maven = true;
		mockMvc.perform(get("/api/logs/logger/").param("test", test).param("project", project)
				.param("classes", String.valueOf(classes)).param("maven", String.valueOf(maven)))
				.andExpect(status().isNotFound());
	}

	@Test
	public void getByTestTypeC() throws Exception {
		String test = "JUnit4TestTestingLTA";
		String project = "JUnit4ProjectTestingLTA";
		boolean classes = false;
		boolean maven = false;
		mockMvc.perform(get("/api/logs/logger/").param("test", test).param("project", project)
				.param("classes", String.valueOf(classes)).param("maven", String.valueOf(maven)))
				.andExpect(status().isNotFound());
	}

	@Before
	public void pre() {
		mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
	}
}
