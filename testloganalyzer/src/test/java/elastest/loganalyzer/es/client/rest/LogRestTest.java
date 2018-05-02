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

	// Bad requests method until Spring allows MockMvc to send boolean and int values to API.
	
	@Test
	public void getByTestTypeA() throws Exception {
		String test = "JUnit4TestTestingLTA";
		String project = "JUnit4ProjectTestingLTA";
		boolean classes = true;
		mockMvc.perform(get("/api/logs").param("test", test).param("project", project).param("classes",
				String.valueOf(classes))).andExpect(status().isBadRequest());
	}

	@Test
	public void getByTestTypeB() throws Exception {
		String test = "JUnit4TestTestingLTA";
		String project = "JUnit4ProjectTestingLTA";
		boolean classes = false;
		boolean maven = true;
		mockMvc.perform(get("/api/logs").param("test", test).param("project", project)
				.param("classes", String.valueOf(classes)).param("maven", String.valueOf(maven)))
				.andExpect(status().isBadRequest());
	}

	@Test
	public void getByTestTypeC() throws Exception {
		String test = "JUnit4TestTestingLTA";
		String project = "JUnit4ProjectTestingLTA";
		boolean maven = false;
		mockMvc.perform(get("/api/logs").param("test", test).param("project", project)
				.param("classes", "false").param("maven", String.valueOf(maven)))
				.andExpect(status().isBadRequest());
	}

	@Before
	public void pre() {
		mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
	}
}
