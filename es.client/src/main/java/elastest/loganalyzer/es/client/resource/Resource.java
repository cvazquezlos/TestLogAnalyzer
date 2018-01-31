package elastest.loganalyzer.es.client.resource;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/files")
public class Resource {
	
	private String recentProject;

	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public ResponseEntity<String> upload(@RequestParam MultipartFile file) {
		System.out.println("Hola");
		try {
			if (file != null) {
				System.out.println(file.getOriginalFilename());
				System.out.println("hey " + recentProject);
			} else {
				System.out.println("Fail");
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseEntity<String> update(@RequestBody String name) {
		System.out.println("Hola");
		System.out.println(name);
		recentProject = name;
		return new ResponseEntity<>(recentProject, HttpStatus.CREATED);
	}

}
