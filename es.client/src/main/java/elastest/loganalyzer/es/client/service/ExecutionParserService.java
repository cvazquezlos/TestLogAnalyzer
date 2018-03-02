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

	@Autowired
	public ExecutionParserService(ESLogService esLogService) {
		this.esLogService = esLogService;
	}

	public void parse(List<String> dirtyData, Project project, int lastId) throws Exception, IOException {
		ArrayList<String> data = new ArrayList<>();
		for (int i = 0; i < dirtyData.size(); i++) {
			data.add(dirtyData.get(i).replaceAll("\n", ""));
		}
		int numExecs = project.getNum_execs();
		data.add(0, "[INFO] Building project and starting unit test number " + numExecs + "...");
		data.add("[INFO] Finishing unit test number " + numExecs + "...");

		String testNumber = String.format("%02d", numExecs);
		Integer identificator = lastId;

		String pattern = "^(((\\d+).)+)(\\s+)(\\w+)(\\s+)(\\S+)(\\s+)(\\S*)((\\S*)((\\w+)|((\\s+)(\\w+)))(\\S*))(\\S*)(\\s+)(((\\w+).)+)(\\s+)(\\S*)(\\s+)(.*)$";
		Pattern targetLog = Pattern.compile(pattern);
		pattern = "^((\\[)|(\\-)|(\\s{1})|(\\r)|(\n)|(Results)|(Tests))(.*)$";
		Pattern mavenLog = Pattern.compile(pattern);
		pattern = "^Running(\\s+)(.*)$";
		Pattern testLog = Pattern.compile(pattern);

		String method = "";
		while (!data.isEmpty()) {
			String line = data.get(0);
			String id = String.format("%04d", identificator);
			System.out.println(line);
			Matcher matcher = targetLog.matcher(line);
			Log log;
			if (matcher.find()) {
				log = new Log(id, project.getName(), testNumber, line, method, matcher.group(1), matcher.group(12),
						matcher.group(5), matcher.group(20), matcher.group(26));
			} else if (mavenLog.matcher(line).find()) {
				matcher = mavenLog.matcher(line);
				log = new Log();
			} else {
				matcher = testLog.matcher(line);
				log = new Log();
			}
			esLogService.save(log);
			data.remove(0);
			identificator++;
		}
	}
	
	/*public void parse(List<String> dirtyData, Project project, int lastId) throws Exception, IOException {
	ArrayList<String> data = new ArrayList<>();
	for (int i = 0; i < dirtyData.size(); i++) {
		data.add(dirtyData.get(i).replaceAll("\n", ""));
	}
	int numExecs = project.getNum_execs();
	data.add(0, "[INFO] Building project and starting unit test number " + numExecs + "...");
	data.add("[INFO] Finishing unit test number " + numExecs + "...");

	String testNumber = String.format("%02d", numExecs);
	Integer identificator = lastId;
	while (data.get(0).indexOf("[") == 0) {
		String id = String.format("%04d", identificator);
		String[] args = getArgsNormal(data.get(0));
		Log log = new Log(id, project.getName(), testNumber, data.get(0), args[0], args[1]);
		esLogService.save(log);
		System.out.println(data.get(0));
		data.remove(0);
		identificator++;
	}
	while (data.get(0).indexOf("R") != 0) {
		String id = String.format("%04d", identificator);
		Log log = new Log(id, project.getName(), testNumber, data.get(0), data.get(0));
		esLogService.save(log);
		System.out.println(data.get(0));
		data.remove(0);
		identificator++;
	}
	String method = "";
	while (data.get(0).length() != 0) {
		if (data.get(0).indexOf("S") == 0) {
			String id = String.format("%04d", identificator);
			Log log = new Log(id, project.getName(), testNumber, data.get(0), data.get(0));
			esLogService.save(log);
			System.out.println(data.get(0));
			method = data.get(0).split(" ")[1];
			data.remove(0);
			identificator++;
		} else if (data.get(0).indexOf("2") == 0) {
			String id = String.format("%04d", identificator);
			String[] args = getArgsLogback(data.get(0));
			Log log = new Log(id, project.getName(), testNumber, data.get(0), method, args[0], args[1], args[2],
					args[3], args[4]);
			esLogService.save(log);
			System.out.println(data.get(0));
			data.remove(0);
			identificator++;
		} else if (data.get(0).indexOf("[") == 0) {
			data.remove(0);
		} else {
			method = "-";
			String id = String.format("%04d", identificator);
			Log log = new Log(id, project.getName(), testNumber, data.get(0), data.get(0));
			esLogService.save(log);
			System.out.println(data.get(0));
			data.remove(0);
			identificator++;
		}
	}
	while (!data.isEmpty()) {
		String id = String.format("%04d", identificator);
		String[] args = getArgsNormal(data.get(0));
		Log log = new Log(id, project.getName(), testNumber, data.get(0), args[0], args[1]);
		esLogService.save(log);
		System.out.println(data.get(0));
		data.remove(0);
		identificator++;
	}
}*/

	private static String[] getArgsLogback(String string) {
		String[] args = new String[5];
		String[] data = string.split(" ");
		args[0] = data[0] + " " + data[1];
		args[1] = data[2].replace("[", "").replace("]", "");
		args[2] = data[3];
		args[3] = data[5];
		args[4] = data[7];
		for (int i = 8; i < data.length; i++) {
			args[4] += " " + data[i];
		}
		return args;
	}

	private static String[] getArgsNormal(String string) {
		String[] args = new String[5];
		String[] data = string.split(" ");
		args[0] = data[0].replace("[", "").replace("]", "");
		if (data.length != 1) {
			args[1] = data[1];
			for (int i = 2; i < data.length; i++) {
				args[1] += " " + data[i];
			}
		} else {
			args[1] = "";
		}
		return args;
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