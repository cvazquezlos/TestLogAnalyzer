package elastest.loganalyzer.es.client.resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/files")
public class Resource {

	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public String upload(@RequestParam MultipartFile file, @RequestParam(name = "project") String name) {
		try {
			if (file != null) {
				System.out.println(file.getOriginalFilename());
				System.out.println(name);
			}
		} catch (Exception e) {
			return "error";
		}
		return "ok";
	}

}
