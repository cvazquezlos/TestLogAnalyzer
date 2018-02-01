package elastest.loganalyzer.es.client.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import elastest.loganalyzer.es.client.model.Log;

@Service
public class ExecutionParserService {

	private final ESLogService esLogService;

	@Autowired
	public ExecutionParserService(ESLogService esLogService) {
		this.esLogService = esLogService;
	}

	public void parse(MultipartFile file, Integer testNo, int lastId) {
		// Save in data ArrayList the content of the file of logs.
		ArrayList<String> data = new ArrayList<String>();
		data.add(0, "[INFO] Building project and starting unit test number " + testNo + "...");
		try {
			File f = new File(file.getOriginalFilename());
			file.transferTo(f);
			BufferedReader br = new BufferedReader(new FileReader(f));
			String line = "";
			while ((line = br.readLine()) != null) {
				data.add(line);
			}
			br.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		data.add("[INFO] Finishing unit test number " + testNo + "...");

		String testNumber = String.format("%02d", testNo);
		Integer identificator = lastId;
		// Just before first -------------------- line.
		while (data.get(0).indexOf("[") == 0) {
			String id = String.format("%04d", identificator);
			String[] args = getArgsNormal(data.get(0));
			Log log = new Log(id, testNumber, data.get(0), args[0], args[1]);
			esLogService.save(log);
			System.out.println(data.get(0));
			data.remove(0);
			identificator++;
		}
		// Just before first Running com.... line.
		while (data.get(0).indexOf("R") != 0) {
			String id = String.format("%04d", identificator);
			Log log = new Log(id, testNumber, data.get(0), data.get(0));
			esLogService.save(log);
			System.out.println(data.get(0));
			data.remove(0);
			identificator++;
		}
		// ALL WORKING PROPERLY TILL HERE.
		String method = "";
		while (data.get(0).length() != 0) {
			if (data.get(0).indexOf("S") == 0) {
				String id = String.format("%04d", identificator);
				Log log = new Log(id, testNumber, data.get(0), data.get(0));
				esLogService.save(log);
				System.out.println(data.get(0));
				method = data.get(0).split(" ")[1];
				data.remove(0);
				identificator++;
			} else if (data.get(0).indexOf("2") == 0) {
				String id = String.format("%04d", identificator);
				String[] args = getArgsLogback(data.get(0));
				Log log = new Log(id, testNumber, data.get(0), method, args[0], args[1], args[2], args[3], args[4]);
				esLogService.save(log);
				System.out.println(data.get(0));
				data.remove(0);
				identificator++;
			} else if (data.get(0).indexOf("[") == 0) {
				data.remove(0);
			} else {
				method = "-";
				String id = String.format("%04d", identificator);
				Log log = new Log(id, testNumber, data.get(0), data.get(0));
				esLogService.save(log);
				System.out.println(data.get(0));
				data.remove(0);
				identificator++;
			}
		}
		while (!data.isEmpty()) {
			String id = String.format("%04d", identificator);
			String[] args = getArgsNormal(data.get(0));
			Log log = new Log(id, testNumber, data.get(0), args[0], args[1]);
			esLogService.save(log);
			System.out.println(data.get(0));
			data.remove(0);
			identificator++;
		}
	}

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
}