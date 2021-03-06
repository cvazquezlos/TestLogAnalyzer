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
@ContextConfiguration(classes = { ProjectRest.class, EsConfiguration.class })
@WebAppConfiguration
public class ProjectRestTest {

	private MockMvc mockMvc;

	@Autowired
	private WebApplicationContext wac;

	@Test
	public void getAll() throws Exception {
		mockMvc.perform(get("/api/projects"));
	}

	@Test
	public void getByName() throws Exception {
		String name = "JUnit4ProjectTestingLTA";
		mockMvc.perform(get("/api/projects/{name}", name)).andExpect(status().isNotFound());
	}

	@Before
	public void pre() {
		mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
	}
}
