package elastest.loganalyzer.es.client.rest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import elastest.loganalyzer.es.client.EsConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@ContextConfiguration(classes = { DiffMatchPatchRest.class, EsConfiguration.class })
@WebAppConfiguration
public class DiffMatchPatchRestTest {

	private MockMvc mockMvc;

	@Autowired
	private WebApplicationContext wac;

	@Test
	public void get() throws Exception {
		String diff1 = "This is the first text to probe the diff algorithm.";
		String diff2 = "This is the 2º text to test the diff algorithm provided by Google.";
		String diffs = "{text1: " + diff1 + ", text2: " + diff2 + "}";
		mockMvc.perform(post("/api/diff").accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON)
				.content(diffs)).andExpect(status().isOk());
	}

	@Before
	public void pre() {
		mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
	}
}
