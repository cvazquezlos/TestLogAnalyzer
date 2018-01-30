package elastest.loganalyzer.es.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import elastest.loganalyzer.es.client.model.Project;
import elastest.loganalyzer.es.client.service.ESLogService;
import elastest.loganalyzer.es.client.service.ESProjectService;

@SpringBootApplication
@Import(EsConfiguration.class)
public class App {

	private static ESLogService logService;
	private static ESProjectService projectService;

	@Autowired
	public void EsLogService(ESLogService service) {
		this.logService = service;
	}

	@Autowired
	public void EsProjectService(ESProjectService service) {
		this.projectService = service;
	}

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
		// resetIndex();
		/*
		 * switch (args[0]) { case "reseting": SpringApplication.run(App.class, args);
		 * resetIndex(); break;
		 * 
		 * case "inserting": SpringApplication.run(App.class, args);
		 * inserDataIntoElasticsearch(); break; default:
		 * System.err.println("Invalid arguments."); }
		 */
	}

	/*
	 * public static void inserDataIntoElasticsearch() { ArrayList<String> data =
	 * new ArrayList<String>(); Integer testNo = 0; try { File f = new
	 * File("testno.txt"); BufferedReader br = new BufferedReader(new
	 * FileReader(f)); String line = ""; while ((line = br.readLine()) != null) {
	 * testNo = Integer.valueOf(line); } data.add(0,
	 * "[INFO] Building project and starting unit test number " + testNo + "...");
	 * testNo += 1; BufferedWriter bw = new BufferedWriter(new FileWriter(f));
	 * String testNumber = String.format("%02d", testNo); bw.write(testNumber);
	 * br.close(); bw.close(); } catch (IOException e) { e.printStackTrace(); }
	 * testNo -= 1; try { File f = new File("log.txt"); BufferedReader br = new
	 * BufferedReader(new FileReader(f)); String line = ""; while ((line =
	 * br.readLine()) != null) { data.add(line); } br.close(); } catch (IOException
	 * e) { e.printStackTrace(); } data.add("[INFO] Finishing unit test number " +
	 * testNo + "..."); String testNumber = String.format("%02d", testNo); Integer
	 * identificator = readIntegerContent("idno.txt"); // Just before first
	 * -------------------- line. while (data.get(0).indexOf("[") == 0) { String id
	 * = String.format("%04d", identificator); String[] args =
	 * getArgsNormal(data.get(0)); Log log = new Log(id, testNumber, data.get(0),
	 * args[0], args[1]); service.save(log); System.out.println(data.get(0));
	 * data.remove(0); identificator++; } // Just before first Running com.... line.
	 * while (data.get(0).indexOf("R") != 0) { String id = String.format("%04d",
	 * identificator); Log log = new Log(id, testNumber, data.get(0), data.get(0));
	 * service.save(log); System.out.println(data.get(0)); data.remove(0);
	 * identificator++; } // ALL WORKING PROPERLY TILL HERE. String method = "";
	 * while (data.get(0).length() != 0) { if (data.get(0).indexOf("S") == 0) {
	 * String id = String.format("%04d", identificator); Log log = new Log(id,
	 * testNumber, data.get(0), data.get(0)); service.save(log);
	 * System.out.println(data.get(0)); method = data.get(0).split(" ")[1];
	 * data.remove(0); identificator++; } else if (data.get(0).indexOf("2") == 0) {
	 * String id = String.format("%04d", identificator); String[] args =
	 * getArgsLogback(data.get(0)); Log log = new Log(id, testNumber, data.get(0),
	 * method, args[0], args[1], args[2], args[3], args[4]); service.save(log);
	 * System.out.println(data.get(0)); data.remove(0); identificator++; } else if
	 * (data.get(0).indexOf("[") == 0) { data.remove(0); } else { method = "-";
	 * String id = String.format("%04d", identificator); Log log = new Log(id,
	 * testNumber, data.get(0), data.get(0)); service.save(log);
	 * System.out.println(data.get(0)); data.remove(0); identificator++; } } while
	 * (!data.isEmpty()) { String id = String.format("%04d", identificator);
	 * String[] args = getArgsNormal(data.get(0)); Log log = new Log(id, testNumber,
	 * data.get(0), args[0], args[1]); service.save(log);
	 * System.out.println(data.get(0)); data.remove(0); identificator++; } String id
	 * = String.format("%04d", identificator); writeContent("idno.txt", id); }
	 * 
	 * private static String[] getArgsLogback(String string) { String[] args = new
	 * String[5]; String[] data = string.split(" "); args[0] = data[0] + " " +
	 * data[1]; args[1] = data[2].replace("[", "").replace("]", ""); args[2] =
	 * data[3]; args[3] = data[5]; args[4] = data[7]; for (int i = 8; i <
	 * data.length; i++) { args[4] += " " + data[i]; } return args; }
	 * 
	 * private static String[] getArgsNormal(String string) { String[] args = new
	 * String[5]; String[] data = string.split(" "); args[0] = data[0].replace("[",
	 * "").replace("]", ""); if (data.length != 1) { args[1] = data[1]; for (int i =
	 * 2; i < data.length; i++) { args[1] += " " + data[i]; } } else { args[1] = "";
	 * } return args; }
	 * 
	 * private static Integer readIntegerContent(String file) { Integer content = 0;
	 * try { File f = new File(file); BufferedReader br = new BufferedReader(new
	 * FileReader(f)); String line = ""; while ((line = br.readLine()) != null) {
	 * content = Integer.valueOf(line); } br.close(); } catch (IOException e) {
	 * e.printStackTrace(); } return content; }
	 */
	private static void resetIndex() {
		Iterable<Project> savedProjects = projectService.findAll();
		for (Project project : savedProjects) {
			projectService.delete(project);
		}
	}
	/*
	 * private static void writeContent(String file, String content) { try { File f
	 * = new File(file); BufferedWriter bw = new BufferedWriter(new FileWriter(f));
	 * bw.write(content); bw.close(); } catch (IOException e) { e.printStackTrace();
	 * } }
	 */

	@Bean
	public WebMvcConfigurerAdapter corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "OPTIONS", "PUT", "DELETE")
						.allowedHeaders("Content-Type", "X-Requested-With", "accept", "Origin",
								"Access-Control-Request-Method", "Access-Control-Request-Headers")
						.exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials")
						.allowCredentials(true).maxAge(3600);
			}
		};
	}
}
