package elastest.loganalyzer.es.client.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import elastest.loganalyzer.es.client.model.Log;
import elastest.loganalyzer.es.client.model.Project;

@Service
public class ExecutionParserService {

	private final ESLogService esLogService;
	private final ESProjectService esProjectService;

	@Autowired
	public ExecutionParserService(ESProjectService esProjectService, ESLogService esLogService) {
		this.esLogService = esLogService;
		this.esProjectService = esProjectService;
	}

	public void parse(List<String> dirtyData, Project project, String tab, int lastId) throws Exception, IOException {
		List<Log> logs = new ArrayList<Log>();
		ArrayList<String> data = new ArrayList<>();
		for (int i = 0; i < dirtyData.size(); i++) {
			data.add(dirtyData.get(i).replaceAll("\n", ""));
		}
		
		int num_execs = project.getNum_execs();
		int recently_deleted = project.getRecently_deleted();
		int testNo = 1;
		if (recently_deleted != -1) {
			testNo = recently_deleted;
			recently_deleted = -1;
		} else {
			testNo = num_execs + 1;
		}
		project.setNum_execs(num_execs + 1);
		project.setRecently_deleted(recently_deleted);
		esProjectService.save(project);
		
		data.add(0, "[INFO] Building project and starting unit test number " + testNo + "...");
		data.add("[INFO] Finishing unit test number " + testNo + "...");

		Integer identificator = lastId;
		String testNumber = String.format("%02d", testNo);

		String pattern = "^(((\\d+).)+)(\\s+)(\\w+)(\\s+)(\\S+)(\\s+)(\\S*)((\\S*)((\\w+)|((\\s+)(\\w+)))(\\S*))(\\S*)(\\s+)(((\\w+).)+)(\\s+)(\\S*)(\\s+)(.*)$";
		Pattern targetLog = Pattern.compile(pattern);
		pattern = "^((\\[)|(\\-)|(\\s{1})|(\\r)|(\\n)|(Results)|(Tests))(.*)$";
		Pattern mavenLog = Pattern.compile(pattern);
		pattern = "^Running(\\s{1})(.*)$";
		Pattern testLog = Pattern.compile(pattern);

		String upperClass = "";
		String method = "";
		String acumulatedException = "";
		boolean exception = false;
		while (!data.isEmpty()) {
			String line = data.get(0);
			String id = String.format("%04d", identificator);
			Log log = new Log(id, line, line, project.getName(), tab, testNumber);
			Matcher target = targetLog.matcher(line);
			Matcher maven = mavenLog.matcher(line);
			Matcher test = testLog.matcher(line);
			if (target.find()) {
				System.out.println("Target log: " + line);
				if (line.contains("##### Start")) {
					method = target.group(26).split(":")[1].replaceAll(" ", "");
					System.out.println("METHOD: " + method);
				} else if (line.contains("##### Finish")) {
					method = "";
				}
				log.setMethod(method);
				log.setTimestamp(target.group(1));
				log.setThread(target.group(12));
				log.setLevel(target.group(5));
				log.setLogger(upperClass + "-" + target.group(20));
				log.setMessage(target.group(26));
			} else if (maven.find()) {
				System.out.println("Maven log: " + line);
				if (line.indexOf("[") == 0) {
					String level = line.split("]")[0].replace("[", "");
					log.setLevel(level);
					log.setMessage(line.replace("[" + level + "]", ""));
				} else if (line.indexOf("Tests run:") == 0) {
					upperClass = "";
					if (line.contains("FAILURE")) {
						exception = true;
					}
				} else if (exception) {
					acumulatedException += line;
				}
			} else if (test.find()) {
				System.out.println("Test log: " + line);
				upperClass = line.split(" ")[1];
			} else {
				System.out.println("Exception log: " + line);
				if (line.length() < 2) {
					exception = false;
					log.setLog(acumulatedException);
					log.setMessage(acumulatedException);
					acumulatedException = "";
				} else 	if (exception) {
					acumulatedException += line;
				}
			}
			if (!exception) {
				logs.add(log);
				identificator++;
			}
			data.remove(0);
		}
		esLogService.saveIterable(logs);
	}

	public List<String> getStreamByUrl(String url) throws IOException {
		@SuppressWarnings("resource")
		ApplicationContext appContext = new ClassPathXmlApplicationContext();
		Resource resource = appContext.getResource(url);

		InputStream is = resource.getInputStream();
		BufferedReader br = new BufferedReader(new InputStreamReader(is));
		List<String> data = new ArrayList<>();
		String line;
		while ((line = br.readLine()) != null) {
			data.add(line);
		}
		br.close();
		return data;
	}

	public List<String> getStreamByFile(MultipartFile file) throws IOException, Exception {
		List<String> data = new ArrayList<>(
				Arrays.asList((new String(file.getBytes(), "UTF-8")).split(System.getProperty("line.separator"))));
		return data;
	}
}